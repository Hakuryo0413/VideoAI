
import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException

from app.helpers.paging import Page, PaginationParams, paginate
from app.models.model_news import News
from app.schemas.sche_base import DataResponse
from app.schemas.sche_news import NewsItemResponse, NewsUpdateRequest
from app.services.srv_news import NewsService
from fastapi_sqlalchemy import db

logger = logging.getLogger()
router = APIRouter()

@router.get("", response_model=Page[NewsItemResponse])
def get_news(params: PaginationParams = Depends()) -> Any:
    """
    API Get list News
    """
    try:
        _query = db.session.query(News)
        params.sort_by = 'news_id'

        news = paginate(model=News, query=_query, params=params)
        return news
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.post("", response_model=DataResponse[NewsItemResponse])
def create_news(news_data: NewsItemResponse, news_service: NewsService = Depends()) -> Any:
    """
    API Create News
    """
    try:
        new_news = news_service.create_news(news_data)
        return DataResponse().success_response(data=new_news)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.get("/{news_id}", response_model=DataResponse[NewsItemResponse])
def detail_news(news_id: str, news_service: NewsService= Depends()) -> Any:
    """
    API get detail News
    """
    try:
        news = news_service.get_news_by_id(news_id)
        return DataResponse().success_response(data=news)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.put("/{news_id}", response_model=DataResponse[NewsItemResponse])
def update_news(news_id: str, news_data: NewsUpdateRequest, news_service: NewsService = Depends()) -> Any:
    """
    API Update News
    """
    try:
        news = news_service.update_news(news_id, news_data)
        return DataResponse().success_response(data=news)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))