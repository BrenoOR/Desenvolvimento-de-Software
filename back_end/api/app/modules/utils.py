"""Classes and functions used in all modules."""

from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel as Base
from uuid import uuid4

BaseDB = declarative_base()


def generate_id() -> str:
    """Generate unique ID."""
    return str(uuid4())


class BaseModel(Base):
    """Base class for all models."""

    def to_dict(self):
        """Convert model to dictionary."""
        return self.model_dump()

    def to_json(self):
        """Convert model to JSON."""
        return self.model_dump_json()
