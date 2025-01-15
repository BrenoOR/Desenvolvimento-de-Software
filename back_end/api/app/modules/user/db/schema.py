from pydantic import BaseModel, Field
from sqlalchemy import Column, ForeignKey, Boolean, String, DateTime
from sqlalchemy.orm import relationship, registry

from modules.utils import BaseDB


table_registry = registry()


@table_registry.mapped_as_dataclass
class User(BaseDB):
    """User model."""

    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True, unique=True)
    username = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    hyperfocuses = relationship("user_hyperfocus", back_populates="user")


@table_registry.mapped_as_dataclass
class Hyperfocus(BaseDB):
    """Hyperfocus model."""

    __tablename__ = "hyperfocuses"

    id = Column(String, primary_key=True, index=True, unique=True)
    name = Column(String)
    description = Column(String)
    tags = Column(String)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    users = relationship("UserHyperfocus", back_populates="hyperfocuses")


@table_registry.mapped_as_dataclass
class UserHyperfocus(BaseDB):
    """Association table between User and Hyperfocus."""

    __tablename__ = "user_hyperfocus"

    user_id = Column(String, ForeignKey("users.id"), primary_key=True)
    hyperfocus_id = Column(String, ForeignKey("hyperfocuses.id"), primary_key=True)

    users = relationship("users", back_populates="hyperfocuses")
    hyperfocuses = relationship("hyperfocuses", back_populates="users")
