from fastapi.exceptions import HTTPException
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.user.models.user import (
    User,
    UserCreate,
    UserPublic,
    UserResponse,
    UsersResponse,
)

database = []


class UserService:
    @staticmethod
    def list_users():
        logger.info("Listing users")
        return [user.to_dict() for user in database]

    @staticmethod
    def get_user(user_id: str):
        logger.info(f"Getting user: {user_id}")
        user = next(
            (
                UserPublic(**user.to_dict())
                for user in database
                if user.user_id == user_id
            ),
            None,
        )
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user.to_dict()

    @staticmethod
    def create_user(user: UserCreate):
        logger.info(f"Creating user: {user.username}")
        user = User(**user.to_dict())
        database.append(user)
        user_response = UserPublic(**user.to_dict())
        return user_response.to_dict()

    @staticmethod
    def update_user(user_id: str, user_update: UserCreate):
        logger.info(f"Updating user: {user_id}")
        user = next(
            (user for user in database if user.user_id == user_id),
            None,
        )
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        user.update(user_update.to_dict())
        return user.to_dict()

    @staticmethod
    def delete_user(user_id: str):
        logger.info(f"Deleting user: {user_id}")
        user = next(
            (user for user in database if user.user_id == user_id),
            None,
        )
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        database.remove(user)
        return user.to_dict()
