from databases import Database
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

import os

DB_USER = os.getenv("DB_USER", "api_db")
DB_PASSWORD = os.getenv("DB_PASSWORD", "api_db")
DB_HOST = os.getenv("DB_HOST", "api_db")
DB_PORT = os.getenv("PORT", 5432)
DB_NAME = os.getenv("DB_NAME", "api_db")

DATABASE_URL = (
    f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_async_engine(DATABASE_URL, future=True, echo=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()
