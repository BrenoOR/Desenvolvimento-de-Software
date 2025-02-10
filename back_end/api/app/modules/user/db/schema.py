from datetime import datetime
from pydantic import BaseModel, Field
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import (
    relationship,
    mapped_column,
    registry,
    Mapped,
)


table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    """User model."""

    __tablename__ = "users"

    user_id: Mapped[str] = mapped_column(
        init=False, primary_key=True, index=True, unique=True
    )
    username: Mapped[str] = mapped_column(index=True, unique=True)
    email: Mapped[str] = mapped_column(index=True, unique=True)
    password: Mapped[str]
    is_active: Mapped[bool]
    is_superuser: Mapped[bool]
    created_at: Mapped[datetime]
    updated_at: Mapped[datetime]

    hyperfocuses = relationship(
        "user_hyperfocus", back_populates="user", cascade="all, delete"
    )


@table_registry.mapped_as_dataclass
class Hyperfocus:
    """Hyperfocus model."""

    __tablename__ = "hyperfocuses"

    name: Mapped[str] = mapped_column(
        init=False, primary_key=True, index=True, unique=True
    )
    description: Mapped[str]
    tags: Mapped[str]
    created_at: Mapped[datetime]
    updated_at: Mapped[datetime]

    users = relationship(
        "UserHyperfocus", back_populates="hyperfocuses", cascade="all, delete"
    )


@table_registry.mapped_as_dataclass
class UserHyperfocus:
    """Association table between User and Hyperfocus."""

    __tablename__ = "user_hyperfocus"

    user_id: Mapped[str] = mapped_column(
        ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True
    )
    hyperfocus_id: Mapped[str] = mapped_column(
        ForeignKey("hyperfocuses.name", ondelete="CASCADE"), primary_key=True
    )

    users = relationship("users", back_populates="hyperfocuses")
    hyperfocuses = relationship("hyperfocuses", back_populates="users")
