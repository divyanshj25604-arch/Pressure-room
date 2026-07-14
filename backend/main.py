import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field, validator
from sqlalchemy.orm import Session as DbSession

from database import session_local
from models import Session as PracticeSession
from models import User

project_root = Path(__file__).resolve().parent.parent
load_dotenv(project_root / ".env")
load_dotenv(Path(__file__).resolve().with_name(".env"), override=True)

SECRET_KEY = os.getenv("SECRET_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()
if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise RuntimeError("SECRET_KEY must be configured in production")
    # The repository should work when freshly checked out; deployments must
    # always provide a unique SECRET_KEY.
    SECRET_KEY = "pressure-room-local-development-key-change-before-deploying"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
origins = os.getenv(
    "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
).split(",")
origins = [origin.strip() for origin in origins if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=254)
    password: str = Field(..., min_length=8, max_length=72)

    @validator("name", "email")
    def strip_required_fields(cls, value):
        value = value.strip()
        if not value:
            raise ValueError("must not be blank")
        return value

    @validator("email")
    def normalize_email(cls, value):
        if "@" not in value:
            raise ValueError("must be a valid email address")
        return value.lower()


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=254)
    password: str = Field(..., min_length=1, max_length=72)

    @validator("email")
    def normalize_email(cls, value):
        return value.strip().lower()


class SessionCreate(BaseModel):
    session_type: str = Field(..., min_length=1, max_length=100)

    @validator("session_type")
    def strip_session_type(cls, value):
        value = value.strip()
        if not value:
            raise ValueError("must not be blank")
        return value


def get_user_by_email(db: DbSession, email: str):
    return db.query(User).filter(User.email == email).first()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: DbSession = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        user = get_user_by_email(db, email)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + (
        expires_delta or timedelta(minutes=15)
    )
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: DbSession = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=pwd_context.hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}


@app.post("/login")
def login_user(data: LoginRequest, db: DbSession = Depends(get_db)):
    user = get_user_by_email(db, data.email)
    if not user or not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": user.email},
    }


@app.get("/me")
def get_me(user: User = Depends(get_current_user)):
    return {"id": user.id, "name": user.name, "email": user.email}


@app.post("/sessions", status_code=status.HTTP_201_CREATED)
def create_session(
    session: SessionCreate,
    user: User = Depends(get_current_user),
    db: DbSession = Depends(get_db),
):
    new_session = PracticeSession(user_email=user.email, session_type=session.session_type)
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session


@app.get("/sessions")
def get_sessions(
    user: User = Depends(get_current_user), db: DbSession = Depends(get_db)
):
    return (
        db.query(PracticeSession)
        .filter(PracticeSession.user_email == user.email)
        .order_by(PracticeSession.created_at.desc())
        .all()
    )
