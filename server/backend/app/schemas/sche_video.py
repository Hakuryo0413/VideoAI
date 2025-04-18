from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel

class ScriptProvider(BaseModel):
    type: str = "microsoft"
    voice_id: str = "Sara"

class Background(BaseModel):
    color: str

class User(BaseModel):
    features: List[Optional[str]]
    stripe_plan_group: str
    authorizer: str
    owner_id: str
    domain: Optional[str]
    id: str
    plan: str
    email: str

class Script(BaseModel):
    type: str = "text"
    subtitles: bool = False
    provider: ScriptProvider
    input: str = ""
    ssml: bool = False

# class Config(BaseModel):
#     result_format: str = "mp4"

class Metadata(BaseModel):
    num_frames: int
    processing_fps: float
    resolution: List[int]
    size_kib: float

class Crop(BaseModel):
    type: str = "wide"

class PresenterConfig(BaseModel):
    crop: Crop

class LogoConfig(BaseModel):
    url: Optional[str]
    position: Optional[List[int]]
    additionalProp: Optional[Dict[str, Any]]

class Config(BaseModel):
    logo: Optional[LogoConfig] 
    result_format: Optional[str] = "mp4"
    output_resolution: Optional[int]

class VideoBase(BaseModel):
    news_id: Optional[int] = None
    name: Optional[str] = None
    result_url: Optional[str] = None
    presenter_id: Optional[str] = None
    uploaded_time: Optional[str] = None
    status: Optional[str] = None
    webhook: Optional[str] = None

    class Config:
        orm_mode = True

class VideoItemResponse(VideoBase):
    # script: Script
    # metadata: Metadata
    # version: Optional[str]
    # audio_url: str
    created_at: Optional[datetime]
    # config: Config
    # source_url: str
    # created_by: str
    status: str
    # driver_id: str
    name: Optional[str]
    # modified_at: str
    # completed_at: str
    # background: Background
    presenter_id: str
    # subtitles: bool
    id: str
    # duration: float
    # presenter_config: PresenterConfig
    # started_at: str
    result_url: Optional[str]
    # user: User
    # owner_id: str
    news_id: str
    # webhook: str
    # uploaded_time: str

    # class Config:   
    #     orm_mode = True

class VideoUpdateRequest(BaseModel):
    # script: Script
    # metadata: Metadata
    # version: str
    # audio_url: str
    created_at: Optional[str]
    # config: Config
    # source_url: str
    # created_by: str
    status: Optional[str]
    # driver_id: str
    name: Optional[str]
    # modified_at: str
    # completed_at: str
    background: Optional[Background]
    presenter_id: Optional[str]
    # subtitles: bool
    # id: str
    # duration: float
    # presenter_config: PresenterConfig
    # started_at: str
    result_url: Optional[str]
    # user: User
    # owner_id: str

class VideoCreateRequest(BaseModel):
    # video_id: str
    # news_id: str
    # video_title: str
    # result_url: str
    presenter_id: str
    # uploaded_time: str
    # status: str
    script: Script
    # config: Config
    presenter_config: PresenterConfig
    webhook: Optional[str] = 'https://3e08-42-113-220-88.ngrok-free.app/video/webhook'
    name: Optional[str] = None
    # id: Optional[str]
    # created_at: Optional[str] = None
    # status: Optional[str] = None

class VideoCreateResponse(BaseModel):
    id: str
    object: str = None
    created_at: str
    status: str

class VideoGetResponse(BaseModel):
    script: Optional[Script] = None
    metadata: Optional[Metadata] = None
    version: Optional[str] = None
    audio_url: Optional[str] = None
    created_at: Optional[str] = None
    config: Optional[Config] = None
    source_url: Optional[str] = None
    created_by: Optional[str] = None
    status: Optional[str] = None
    driver_id: Optional[str] = None
    name: Optional[str] = None
    modified_at: Optional[str] = None
    completed_at: Optional[str] = None
    background: Optional[Background] = None
    presenter_id: Optional[str] = None
    subtitles: Optional[bool] = None
    duration: Optional[float] = None
    presenter_config: Optional[PresenterConfig] = None
    started_at: Optional[str] = None
    result_url: Optional[str] = None
    user: Optional[User] = None
    owner_id: Optional[str] = None

