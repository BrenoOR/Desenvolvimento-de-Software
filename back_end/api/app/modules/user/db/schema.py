from datetime import datetime
from pydantic import BaseModel, Field
from sqlalchemy import ARRAY, ForeignKey, String
from sqlalchemy.orm import (
    relationship,
    mapped_column,
    registry,
    Mapped,
)


table_registry = registry()


@table_registry.mapped_as_dataclass
class UserHyperfocus:
    """Association table between User and Hyperfocus."""

    __tablename__ = "UserHyperfocus"

    user_id: Mapped[str] = mapped_column(
        ForeignKey("User.user_id"), init=False, primary_key=True
    )
    hyperfocus_id: Mapped[str] = mapped_column(
        ForeignKey("Hyperfocus.name"), init=False, primary_key=True
    )

    users = relationship("User", back_populates="hyperfocuses")
    hyperfocuses = relationship("Hyperfocus", back_populates="users")


@table_registry.mapped_as_dataclass
class User:
    """User model."""

    __tablename__ = "User"

    user_id: Mapped[str] = mapped_column(primary_key=True, index=True, unique=True)
    username: Mapped[str] = mapped_column(index=True, unique=True)
    email: Mapped[str] = mapped_column(index=True, unique=True)
    pronoums: Mapped[str]
    profile_picture: Mapped[str]
    avatar_picture: Mapped[str]
    is_active: Mapped[bool]
    created_at: Mapped[datetime]
    updated_at: Mapped[datetime]

    hyperfocuses = relationship("UserHyperfocus", back_populates="users")


@table_registry.mapped_as_dataclass
class Hyperfocus:
    """Hyperfocus model."""

    __tablename__ = "Hyperfocus"

    name: Mapped[str] = mapped_column(primary_key=True, index=True, unique=True)
    description: Mapped[str]
    tags: Mapped[str]
    related_hyperfocuses: Mapped[list[str]] = mapped_column(ARRAY(String))
    created_at: Mapped[datetime]
    updated_at: Mapped[datetime]

    users = relationship("UserHyperfocus", back_populates="hyperfocuses")
