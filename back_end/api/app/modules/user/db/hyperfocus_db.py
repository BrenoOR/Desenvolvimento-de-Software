from fastapi.exceptions import HTTPException
from loguru import logger
from typing import List
from sqlalchemy.orm import Session

from app.modules.user.models.hyperfocus import HyperFocus


class HyperFocusDB:
    def list_hyperfocus(
        self, max_results: int, page_number: int, db: Session
    ) -> List[HyperFocus]:
        try:
            hyperfocus = (
                db.query(HyperFocus)
                .limit(max_results)
                .offset((page_number - 1) * max_results)
            ).all()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return hyperfocus

    def get_hyperfocus(
        self, hyperfocus_id: str, db: Session, raise_if_not_found: bool = True
    ) -> HyperFocus:
        try:
            hyperfocus = (
                db.query(HyperFocus)
                .filter(HyperFocus.name == hyperfocus_id.lower())
                .first()
            )
            if hyperfocus is None and raise_if_not_found:
                raise HTTPException(status_code=404, detail="Hyperfocus not found")
        except Exception as exception:
            logger.error(f"Error: {exception}")
            raise exception
        return hyperfocus

    def create_hyperfocus(self, hyperfocus: HyperFocus, db: Session) -> HyperFocus:
        try:
            hyperfocus_db = (
                db.query(HyperFocus).filter(HyperFocus.name == hyperfocus.name).first()
            )
            if hyperfocus_db is not None:
                raise HTTPException(
                    status_code=400, detail="Hyperfocus already registered"
                )
            db.add(hyperfocus)
            db.commit()
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return hyperfocus

    def update_hyperfocus(
        self, hyperfocus_id: str, hyperfocus_update: HyperFocus, db: Session
    ) -> HyperFocus:
        try:
            hyperfocus_db = (
                db.query(HyperFocus).filter(HyperFocus.name == hyperfocus_id).first()
            )
            if hyperfocus_db is None:
                raise HTTPException(status_code=404, detail="Hyperfocus not found")

            hyperfocus_db.update(hyperfocus_update.to_dict())
            db.query(HyperFocus).filter(HyperFocus.name == hyperfocus_db.name).update(
                hyperfocus_db.to_dict()
            )
        except Exception as exception:
            logger.error(f"Error: {exception}")
            db.rollback()
            raise exception
        return hyperfocus_db
