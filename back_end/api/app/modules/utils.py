"""Classes and functions used in all modules."""

from pydantic import BaseModel as Base
from uuid import uuid4


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
