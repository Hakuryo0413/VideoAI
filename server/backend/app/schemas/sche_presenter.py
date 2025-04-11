from typing import Optional

from pydantic import BaseModel


class PresenterBase(BaseModel):
    gender: Optional[str] = None
    name: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    model_url: Optional[str] = None
    modified_at: Optional[str] = None
    owner_id: Optional[str] = None
    thumbnail_url: Optional[str] = None
    preview_url: Optional[str] = None
    status: Optional[str] = None
    talking_preview_url: Optional[str] = None

    class Config:
        orm_mode = True

class PresenterItemResponse(PresenterBase):
    presenter_id: str
    gender: str
    name: str
    image_url: str
    video_url: Optional[str] = None
    thumbnail_url: str
    preview_url: str
    status: str
    talking_preview_url: str
    model_url: Optional[str] = None
    modified_at: str
    owner_id: str


class PresenterCreateRequest(PresenterBase):
    presenter_id: str
    gender: str
    name: str
    image_url: str
    video_url: Optional[str] = None
    thumbnail_url: str
    preview_url: str
    status: str
    talking_preview_url: str
    model_url: Optional[str] = None
    modified_at: str
    owner_id: str

