from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, Depends
from app.core.config import settings
from app.core.database import db_manager
from app.api.auth import get_current_user
from app.models.user import UserResponse

router = APIRouter(prefix="/settings", tags=["Settings"])

class SystemSettings(BaseModel):
    nvidia_api_key_configured: bool
    nvidia_model: str
    nvidia_base_url: str
    mongodb_status: str
    theme: str = "dark"

class SystemSettingsUpdate(BaseModel):
    nvidia_api_key: Optional[str] = None
    nvidia_model: Optional[str] = None
    theme: Optional[str] = None

@router.get("", response_model=SystemSettings)
async def get_settings(current_user: UserResponse = Depends(get_current_user)):
    mongo_status = "Connected (Atlas / Local)" if db_manager.is_connected else "Fallback (In-Memory Engine)"
    return SystemSettings(
        nvidia_api_key_configured=bool(settings.NVIDIA_API_KEY),
        nvidia_model=settings.NVIDIA_MODEL,
        nvidia_base_url=settings.NVIDIA_BASE_URL,
        mongodb_status=mongo_status,
        theme="dark"
    )

@router.put("", response_model=SystemSettings)
async def update_settings(
    settings_in: SystemSettingsUpdate,
    current_user: UserResponse = Depends(get_current_user)
):
    if settings_in.nvidia_api_key is not None:
        settings.NVIDIA_API_KEY = settings_in.nvidia_api_key
    if settings_in.nvidia_model is not None:
        settings.NVIDIA_MODEL = settings_in.nvidia_model

    mongo_status = "Connected (Atlas / Local)" if db_manager.is_connected else "Fallback (In-Memory Engine)"
    return SystemSettings(
        nvidia_api_key_configured=bool(settings.NVIDIA_API_KEY),
        nvidia_model=settings.NVIDIA_MODEL,
        nvidia_base_url=settings.NVIDIA_BASE_URL,
        mongodb_status=mongo_status,
        theme=settings_in.theme or "dark"
    )
