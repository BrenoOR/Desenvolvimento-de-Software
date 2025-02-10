"""User module database configuration."""

import os

from fastapi import Depends
from loguru import logger
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy_utils import create_database, database_exists

env = os.environ["ENVIRONMENT"]
db_user = os.environ["POSTGRES_USER"]
db_password = os.environ["POSTGRES_PASSWORD"]
db_host = "db"
db_port = os.environ["POSTGRES_PORT"]
db_name = "local_db"

ALEMBIC_DB_URL = "postgresql://postgres:postgres@localhost:5432/local_db"
LOCAL_DB_URL = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"


def get_db_url() -> str:
    """Get the database URL."""
    if env == "local":
        return LOCAL_DB_URL

    DB_URL = f"postgresql://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"
    return DB_URL


def get_engine():
    """Get the database session."""
    db_url = get_db_url()
    engine = create_engine(db_url)
    if not database_exists(engine.url):
        create_database(engine.url)
        logger.info("Database created")
    return engine


def get_session():
    """Get the database session."""
    with Session(get_engine()) as session:
        yield session
