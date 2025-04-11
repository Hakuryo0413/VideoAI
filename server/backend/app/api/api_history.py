
import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException

from app.helpers.paging import Page, PaginationParams, paginate
from app.models.model_history import VideoHistory
from app.schemas.sche_base import DataResponse
from app.schemas.sche_history import HistoryItemResponse, HistoryUpdateRequest
from fastapi_sqlalchemy import db

from app.services.srv_history import HistoryService

logger = logging.getLogger()
router = APIRouter()

@router.get("", response_model=Page[HistoryItemResponse])
def get_history(params: PaginationParams = Depends()) -> Any:
    """
    API Get list History
    """
    try:
        _query = db.session.query(VideoHistory)
        params.sort_by = 'history_id'
        history_list = paginate(model=VideoHistory, query=_query, params=params)
        print("HISTORY LIST: ", history_list)
        return history_list
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.get("/{history_id}", response_model=DataResponse[HistoryItemResponse])
def detail_history(history_id: str, history_service: HistoryService = Depends()) -> Any:
    """
    API get detail History
    """
    try:
        history = history_service.get_history_by_id(history_id)
        return DataResponse().success_response(data = history)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.put("/{history_id}", response_model=DataResponse[HistoryItemResponse])
def update_history(history_id: str, history_data: HistoryUpdateRequest, history_service: HistoryService = Depends()) -> Any:
    """
    API Update History
    """
    try:
        return DataResponse().success_response(data=history_service.update_status_history(history_id, history_data))
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))
    
@router.get("/video/{video_id}", response_model=DataResponse[HistoryItemResponse])
def get_history_by_video_id(video_id: str, history_service: HistoryService = Depends()) -> Any:
    """
    API get detail History
    """
    try:
        history = history_service.get_history_by_video_id(video_id)
        print("HISTORY: ", history)
        history_response = HistoryItemResponse(
            history_id = history.history_id,
            video_id = history.video_id,
            status = history.status,
            reviewed_at = history.reviewed_at
        )
        return DataResponse().success_response(data=history_response)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))