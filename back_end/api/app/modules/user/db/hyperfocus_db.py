from fastapi.exceptions import HTTPException
from loguru import logger
from typing import List
from sqlalchemy.orm import Session

from app.modules.user.db.schema import (
    Hyperfocus as HyperfocusSchema,
    UserHyperfocus as UserHyperfocusSchema,
    User as UserSchema,
)
from app.modules.user.models.hyperfocus import HyperFocus


class HyperFocusDB:
    @staticmethod
    def list_hyperfocus(
        max_results: int, page_number: int, db: Session
    ) -> List[HyperFocus]:
        try:
            hyperfocus = (
                db.query(HyperfocusSchema)
                .limit(max_results)
                .offset((page_number - 1) * max_results)
            ).all()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return hyperfocus

    @staticmethod
    def get_hyperfocus(
        hyperfocus_id: str, db: Session, raise_if_not_found: bool = True
    ) -> HyperFocus:
        try:
            hyperfocus = (
                db.query(HyperfocusSchema)
                .filter(HyperfocusSchema.name == hyperfocus_id.lower())
                .first()
            )
            if hyperfocus is None and raise_if_not_found:
                raise HTTPException(status_code=404, detail="Hyperfocus not found")
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return hyperfocus

    @staticmethod
    def create_hyperfocus(
        hyperfocus: HyperFocus,
        db: Session,
        raise_if_found: bool = True,
    ) -> HyperFocus:
        try:
            hyperfocus_db = (
                db.query(HyperfocusSchema)
                .filter(HyperfocusSchema.name == hyperfocus.name)
                .first()
            )
            if hyperfocus_db is not None and raise_if_found:
                raise HTTPException(
                    status_code=400, detail="Hyperfocus already registered"
                )
            hyperfocus_db = HyperfocusSchema(**hyperfocus.to_dict())
            db.add(hyperfocus_db)
            db.commit()
            db.refresh(hyperfocus_db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return hyperfocus

    @staticmethod
    def update_hyperfocus(
        hyperfocus_id: str, hyperfocus_update: HyperFocus, db: Session
    ) -> HyperFocus:
        try:
            hyperfocus_db = HyperFocus(name=hyperfocus_id)
            hyperfocus_db.update(hyperfocus_update.to_dict())
            is_updated = (
                db.query(HyperfocusSchema)
                .filter(HyperfocusSchema.name == hyperfocus_id)
                .update(
                    {
                        key: getattr(hyperfocus_db, key)
                        for key in hyperfocus_db.to_dict().keys()
                        if getattr(hyperfocus_db, key) is not None or key == "name"
                    }
                )
            )
            if not is_updated:
                raise HTTPException(
                    status_code=404, detail=f"Hyperfocus {hyperfocus_id} not found"
                )
            db.commit()
            db.refresh(db)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return hyperfocus_db

    @staticmethod
    def delete_hyperfocus(hyperfocus_id: str, db: Session) -> HyperFocus:
        try:
            hyperfocus = (
                db.query(HyperfocusSchema)
                .filter(HyperfocusSchema.name == hyperfocus_id)
                .first()
            )
            if hyperfocus is None:
                raise HTTPException(status_code=404, detail="Hyperfocus not found")
            db.delete(hyperfocus)
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return hyperfocus

    @staticmethod
    def get_user_with_hyperfocus(
        user_id: str,
        hyperfocus_id: str,
        db: Session,
        raise_if_not_found: bool = True,
    ):
        try:
            user_hyperfocus = (
                db.query(UserSchema)
                .filter(
                    UserHyperfocusSchema.user_id == user_id,
                    UserHyperfocusSchema.hyperfocus_id == hyperfocus_id,
                    UserSchema.user_id == UserHyperfocusSchema.user_id,
                )
                .first()
            )
            if user_hyperfocus is None and raise_if_not_found:
                raise HTTPException(
                    status_code=404,
                    detail=f"User {user_id} without hyperfocus {hyperfocus_id}",
                )
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return user_hyperfocus

    @staticmethod
    def add_user_to_hyperfocus(
        user_id: str,
        hyperfocus_id: str,
        db: Session,
        raise_if_already_has: bool = True,
    ) -> HyperFocus:
        try:
            user: UserSchema = (
                db.query(UserSchema).filter(UserSchema.user_id == user_id).first()
            )
            hyperfocus: HyperfocusSchema = (
                db.query(HyperfocusSchema)
                .filter(HyperfocusSchema.name == hyperfocus_id)
                .first()
            )
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
            if hyperfocus is None:
                raise HTTPException(status_code=404, detail="Hyperfocus not found")

            check_user_hyperfocus = HyperFocusDB.get_user_with_hyperfocus(
                user_id=user_id,
                hyperfocus_id=hyperfocus_id,
                db=db,
                raise_if_not_found=False,
            )

            if check_user_hyperfocus and raise_if_already_has:
                raise HTTPException(
                    status_code=400,
                    detail=f"User {user_id} already has hyperfocus {hyperfocus_id}",
                )

            user_hyperfocus = UserHyperfocusSchema()
            user_hyperfocus.hyperfocuses = hyperfocus
            user.hyperfocuses.append(user_hyperfocus)

            db.add(user_hyperfocus)
            db.commit()
            db.refresh(user_hyperfocus)
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return user_hyperfocus
