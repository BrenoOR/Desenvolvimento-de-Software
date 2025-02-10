from fastapi.exceptions import HTTPException
from loguru import logger
from typing import List
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.modules.user.db.schema import (
    User as UserSchema,
    UserHyperfocus as UserHyperfocusSchema,
    Hyperfocus as HyperfocusSchema,
)
from app.modules.user.models.user import User, UserPublic, UserCreate


class UserDB:
    @staticmethod
    def list_users(max_results: int, page_number: int, db: Session) -> List[UserPublic]:
        try:
            users = (
                db.query(
                    UserSchema.user_id,
                    UserSchema.username,
                    UserSchema.email,
                    UserSchema.is_active,
                    UserSchema.is_superuser,
                    UserSchema.created_at,
                    UserSchema.updated_at,
                    func.array_agg(UserHyperfocusSchema.hyperfocus_id).label(
                        "hyperfocuses"
                    ),
                )
                .join(
                    UserHyperfocusSchema,
                    UserSchema.user_id == UserHyperfocusSchema.user_id,
                    isouter=True,
                )
                .group_by(
                    UserSchema.user_id,
                    UserSchema.username,
                    UserSchema.email,
                    UserSchema.is_active,
                    UserSchema.is_superuser,
                    UserSchema.created_at,
                    UserSchema.updated_at,
                )
                .limit(max_results)
                .offset((page_number - 1) * max_results)
            ).all()

            response = []
            for user in users:
                logger.info(f"Appending user: {user}")
                user_dict = user.__dict__
                response.append(UserPublic(**user_dict))
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return response

    @staticmethod
    def get_user(user_id: str, db: Session) -> UserPublic:
        try:
            user = db.query(UserSchema).filter(UserSchema.user_id == user_id).first()
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user

    @staticmethod
    def create_user(user: User, db: Session) -> UserPublic:
        try:
            user_db = (
                db.query(UserSchema).filter(UserSchema.email == user.email).first()
            )
            if user_db is not None:
                raise HTTPException(
                    status_code=400, detail="User email already registered"
                )

            user_db = UserSchema(**user.to_dict())
            db.add(user_db)
            db.commit()
            db.refresh(user_db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user

    @staticmethod
    def update_user(user_id: str, user_update: UserCreate, db: Session) -> UserPublic:
        try:
            user_db = db.query(UserSchema).filter(UserSchema.user_id == user_id).first()
            if user_db is None:
                raise HTTPException(status_code=404, detail="User not found")

            user_db.update(user_update.to_dict())
            db.query(UserSchema).filter(UserSchema.user_id == user_db.user_id).update(
                user_db.to_dict()
            )
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user_db

    @staticmethod
    def delete_user(user_id: str, db: Session) -> UserPublic:
        try:
            user = db.query(UserSchema).filter(UserSchema.user_id == user_id).first()
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")

            db.delete(user)
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user
