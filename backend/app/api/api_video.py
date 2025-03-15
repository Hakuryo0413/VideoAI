import os
import logging
from typing import Any
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
import requests

from app.helpers.paging import Page, PaginationParams, paginate
from app.models.model_video import Video
from app.schemas.sche_base import DataResponse
from app.schemas.sche_video import VideoCreateRequest, VideoCreateResponse, VideoGetResponse, VideoItemResponse, VideoUpdateRequest
from fastapi_sqlalchemy import db

from app.services.srv_video import VideoService

load_dotenv()
logger = logging.getLogger()
router = APIRouter()
api_key= os.getenv('D_ID_API_KEY')
api_url = os.getenv('D_ID_BASE_URL')
headers = {
        'accept': 'application/json',
        'authorization': f"Basic {api_key}",
        'content-type': 'application/json'
    }

@router.get("", response_model=Page[VideoItemResponse])
def get_list_videos(params: PaginationParams = Depends()) -> Any:
    """
    API Get list Video
    """
    try:
        _query = db.session.query(Video)
        video_list = paginate(model=Video, query=_query, params=params)
        print("VIDEO LIST: ", video_list)
        return video_list
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

# @router.get("/{video_id}", response_model=DataResponse[VideoItemResponse])
# def detail_video(video_id: int, video_service: VideoService = Depends()) -> Any:
#     """
#     API get detail Video
#     """
#     try:
#         return DataResponse().success_response(data=video_service.get_video_by_id(video_id))
#     except Exception as e:
#         return HTTPException(status_code=400, detail=logger.error(e))

@router.post("", response_model=DataResponse[VideoCreateResponse])
def post_video(video_data: VideoCreateRequest, video_service: VideoService = Depends()) -> Any:
    """
    API Create Video
    """
    try:
        response = requests.post(f"{api_url}/clips", headers=headers, data = video_data.json())
        video_response = VideoCreateResponse.parse_obj(response.json())
        new_video = video_service.post_video(video_response)
        video_dict = {
            "id": new_video.id,
            "status": new_video.status,
            "created_at": str(new_video.created_at),
            # "object": new_video.object
        }
        return DataResponse().success_response(data=video_dict)
    except Exception as e:
        return HTTPException(status_code=500, detail=logger.error(e))
    

# @router.post("", response_model=DataResponse[VideoCreateResponse])
# def post_video(video_data: VideoCreateRequest, video_service: VideoService = Depends()) -> Any:
#     """
#     API Create Video
#     """
#     try:
#         response = {'id': 'clp_XPDMSbFR1U-S06Is', 'created_at': '2025-03-14T04:00:00.328Z', 'object': 'clip', 'status': 'created'}
#         video_response = VideoCreateResponse.parse_obj(response)
#         print("VIDEO RESPONSE: ", video_response)
#         new_video = video_service.post_video(video_response)
#         print("NEW VIDEO: ", new_video)
#         video_dict = {
#             "id": new_video.id,
#             "status": new_video.status,
#             "created_at": str(new_video.created_at),
#             # "object": new_video.object
#         }
#         # new = VideoCreateResponse.parse_obj(new_video)
#         print("NEW: ", video_dict)
#         return DataResponse().success_response(data=video_dict)
#     except Exception as e:
#         return HTTPException(status_code=500, detail=logger.error(e))
    
@router.get("/{video_id}", response_model=DataResponse[VideoGetResponse])
def get_video_by_id(video_id: str, video_service: VideoService = Depends()) -> Any:
    """
    API get detail Video
    """
    try:
        response = requests.get(f"{api_url}/clips/{video_id}", headers=headers)
        video = response.json()
        print("VIDEO: ", video)
        # data = video_service.update_video(video_id, response.json())
        return DataResponse().success_response(data=video)
        # return DataResponse().success_response(data=video_service.get_video_by_id(video_id))
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.put("/{video_id}", response_model=DataResponse[VideoGetResponse])
def update_video(video_id: str, video_data: VideoGetResponse, video_service: VideoService = Depends()) -> Any:
    """
    API Update Video
    """
    try:
        updated_video = video_service.update_video_detail(video_id, video_data)
        return DataResponse().success_response(data=updated_video)
    except Exception as e:
        return HTTPException(status_code=400, detail=str(e))
    

@router.get("/news/{news_id}", response_model=DataResponse[VideoItemResponse])
def get_video_by_news_id(news_id: str, video_service: VideoService = Depends()) -> Any:
    """
    API get detail Video
    """
    try:
        video = video_service.get_detail_video_by_news_id(news_id)
        video_response = VideoItemResponse(
            id=video.id,
            news_id=video.news_id,
            name=video.name,
            status=video.status,
            presenter_id=video.presenter_id,
            result_url=video.result_url,
        )
        return DataResponse().success_response(data=video_response)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))
    

# clp_HlLCg3-uM5-K6DKsPz0dJ

@router.post("/webhook")
def webhook_video(video_data: VideoCreateResponse) -> Any:

    try:
        print("WEBHOOK: ", video_data)
        video = get_video_by_id(video_data.id)
        print("VIDEO: ", video) 
        return "OK"
    except Exception as e:
        return HTTPException(status_code=500, detail=logger.error(e))