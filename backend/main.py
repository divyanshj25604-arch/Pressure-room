from sqlalachemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from fastapi import FastAPI

app = FastAPI()

database_url = "sqlite:///pressure-room.db"

engine = create_engine(database_url, connect_args={"check_same_thread": False})