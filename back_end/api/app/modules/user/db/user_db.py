from fastapi.exceptions import HTTPException
from loguru import logger
from typing import List
from sqlalchemy.orm import Session

from app.modules.user.models.user import User, UserPublic, UserCreate


class UserDB:
    def list_users(
        self, max_results: int, page_number: int, db: Session
    ) -> List[UserPublic]:
        try:
            users = (
                db.query(User)
                .limit(max_results)
                .offset((page_number - 1) * max_results)
            ).all()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return users

    def get_user(self, user_id: str, db: Session) -> UserPublic:
        try:
            user = db.query(User).filter(User.user_id == user_id).first()
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user

    def create_user(self, user: User, db: Session) -> UserPublic:
        try:
            user_db = db.query(User).filter(User.email == user.email).first()
            if user_db is not None:
                raise HTTPException(
                    status_code=400, detail="User email already registered"
                )

            db.add(user)
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user

    def update_user(
        self, user_id: str, user_update: UserCreate, db: Session
    ) -> UserPublic:
        try:
            user_db = db.query(User).filter(User.user_id == user_id).first()
            if user_db is None:
                raise HTTPException(status_code=404, detail="User not found")

            user_db.update(user_update.to_dict())
            db.query(User).filter(User.user_id == user_db.user_id).update(
                user_db.to_dict()
            )
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user_db

    def delete_user(self, user_id: str, db: Session) -> UserPublic:
        try:
            user = db.query(User).filter(User.user_id == user_id).first()
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")

            db.delete(user)
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user
