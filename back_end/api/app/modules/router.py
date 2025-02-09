from fastapi import APIRouter
from starlette_prometheus import metrics
from app.modules.user.user import router as user_router

router = APIRouter()
router.include_router(user_router, prefix="/users")
