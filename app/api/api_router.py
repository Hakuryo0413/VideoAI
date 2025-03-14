from fastapi import APIRouter

from app.api import api_history, api_news, api_presenter, api_user, api_login, api_register, api_healthcheck, api_video

router = APIRouter()

router.include_router(api_healthcheck.router, tags=["health-check"], prefix="/healthcheck")
router.include_router(api_login.router, tags=["login"], prefix="/login")
router.include_router(api_register.router, tags=["register"], prefix="/register")
router.include_router(api_user.router, tags=["user"], prefix="/users")
router.include_router(api_news.router, tags=["news"], prefix="/news")
router.include_router(api_video.router, tags=["video"], prefix="/video")
router.include_router(api_history.router, tags=["history"], prefix="/history")
router.include_router(api_presenter.router, tags=["presenter"], prefix="/presenter")
