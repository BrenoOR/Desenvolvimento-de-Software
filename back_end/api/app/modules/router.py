from fastapi import APIRouter
from starlette_prometheus import metrics
from app.modules.user.user import router as user_router
from app.modules.auth.auth import router as auth_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth")
router.include_router(user_router, prefix="/users")
