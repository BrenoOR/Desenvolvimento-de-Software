from fastapi.exceptions import HTTPException
from loguru import logger
from sqlalchemy.orm import Session

from app.modules.user.db.user_db import UserDB
from app.modules.user.db.hyperfocus_db import HyperFocusDB
from app.modules.user.models.user import (
    User,
    UserCreate,
    UserPublic,
    UserResponse,
    UsersResponse,
)
from app.modules.user.models.hyperfocus import HyperFocus


class UserService:
    @staticmethod
    def list_users(max_results: int, page_number: int, db: Session):
        logger.info("Listing users")
        try:
            users = UserDB().list_users(max_results, page_number, db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return users

    @staticmethod
    def get_user(user_id: str, db: Session):
        logger.info(f"Getting user: {user_id}")
        try:
            user = UserDB().get_user(user_id, db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user

    @staticmethod
    def create_user(user: UserCreate, db: Session):
        logger.info(f"Creating user: {user.username}")
        try:
            user_create = user.to_dict()
            for hyperfocus_id in user.hyperfocuses:
                hyperfocus = HyperFocusDB().get_hyperfocus(
                    hyperfocus_id, db, raise_if_not_found=False
                )
                if hyperfocus is None:
                    related_hyperfocuses = user.hyperfocuses.copy()
                    hyperfocus = HyperFocus(
                        {
                            "name": hyperfocus_id.lower(),
                            "description": f"Hyperfocus in {hyperfocus_id}",
                            "tags": [hyperfocus_id],
                        }
                    )
                    for related_hyperfocus in related_hyperfocuses:
                        hyperfocus.add_related_hyperfocus(related_hyperfocus.lower())
                    HyperFocusDB().create_hyperfocus(hyperfocus=hyperfocus, db=db)
                user_create["hyperfocuses"].remove(hyperfocus_id)
                user_create["hyperfocuses"].append(hyperfocus.name)

            user = User(**user_create)
            user = UserDB().create_user(user, db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user

    @staticmethod
    def update_user(user_id: str, user_update: UserCreate, db: Session):
        logger.info(f"Updating user: {user_id}")
        try:
            user = UserDB().update_user(user_id, user_update, db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user

    @staticmethod
    def delete_user(user_id: str, db: Session):
        logger.info(f"Deleting user: {user_id}")
        try:
            user = UserDB().delete_user(user_id, db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user
