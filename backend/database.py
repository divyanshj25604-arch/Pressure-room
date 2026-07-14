import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

default_database_path = Path(__file__).resolve().with_name("pressure-room.db")
database_url = os.getenv("DATABASE_URL", f"sqlite:///{default_database_path}")

engine = create_engine(database_url, connect_args={"check_same_thread": False})

session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
