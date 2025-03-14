from app.models.model_video import Video
from app.schemas.sche_video import VideoCreateRequest, VideoCreateResponse, VideoGetResponse, VideoItemResponse, VideoUpdateRequest
from fastapi_sqlalchemy import db


class VideoService(object):
    _instance = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def get_video_list():
        return db.session.query(Video).all()
    
    @staticmethod
    def get_video_by_id(id: str):
        exist_video = db.session.query(Video).get(id)
        if exist_video is None:
            raise Exception('Video not exists')
        return exist_video

    @staticmethod
    def update_status_video(video_id : str, data: VideoUpdateRequest):
        video = db.session.query(Video).get(video_id)
        if video is None:
            raise Exception('Video not exists')
        video.status = video.status if data.status is None else data.status
        db.session.commit()
        return video
    
 
    @staticmethod
    def update_video_detail(id : str, data: VideoGetResponse):
        video = db.session.query(Video).get(id)
        if video is None:
            raise Exception('Video not exists')
        # video.script = video.script if data.script is None else data.script
        # video.metadata = video.metadata if data.metadata is None else data.metadata
        # video.version = video.version if data.version is None else data.version        
        # video.audio_url = video.audio_url if data.audio_url is None else data.audio_url
        video.created_at = video.created_at if data.created_at is None else data.created_at
        # video.config = video.config if data.config is None else data.config
        # video.source_url = video.source_url if data.source_url is None else data.source_url
        # video.created_by = video.created_by if data.created_by is None else data.created_by
        video.status = video.status if data.status is None else data.status
        # video.driver_id = video.driver_id if data.driver_id is None else data.driver_id
        video.name = video.name if data.name is None else data.name
        # video.modified_at = video.modified_at if data.modified_at is None else data.modified_at   
        # video.completed_at = video.completed_at if data.completed_at is None else data.completed_at
        # video.background = video.background if data.background is None else data.background
        video.presenter_id = video.presenter_id if data.presenter_id is None else data.presenter_id
        # video.subtitles = video.subtitles if data.subtitles is None else data.subtitles
        # video.duration = video.duration if data.duration is None else data.duration
        # video.presenter_config = video.presenter_config if data.presenter_config is None else data.presenter_config
        # video.started_at = video.started_at if data.started_at is None else data.started_at   
        video.result_url = video.result_url if data.result_url is None else data.result_url
        # video.user = video.user if data.user is None else data.user
        # video.owner_id = video.owner_id if data.owner_id is None else data.owner_id
        db.session.commit()
        return data
    
    @staticmethod
    def get_detail_video_by_news_id(news_id: str):
        exist_video = db.session.query(Video).filter(Video.news_id == news_id).first()
        if exist_video is None:
            raise Exception('Video not exists')
        return exist_video
    
    @staticmethod
    def post_video(data: VideoCreateResponse):
        video = Video(
            id=data.id,
            status=data.status,
            created_at=data.created_at,
            news_id="1",
            # video_title=data.name,
            # result_url=data.result_url,
            presenter_id="324",
            # uploaded_time=data.uploaded_time,
            # status=data.status,
            # script=data.script,
            # config=data.config,
            # presenter_config=data.presenter_config,
            # webhook=data.webhook,
            # name=data.name
        )
        print("KAKAKA: ", data)
        print("video: ", video)
        db.session.add(video)
        db.session.commit()
        return video