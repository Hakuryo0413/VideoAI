
import logging
import os
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException

from app.helpers.paging import Page, PaginationParams, paginate
from app.models.model_news import News
from app.schemas.sche_base import DataResponse
from app.schemas.sche_news import NewsCreateRequest, NewsItemResponse, NewsUpdateRequest, NewsUpdateResponse
from app.services.srv_news import NewsService
from fastapi_sqlalchemy import db
# from feature import parse_news_from_file

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
def create_news(news_data: NewsCreateRequest, news_service: NewsService = Depends()) -> Any:
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

@router.put("/{news_id}", response_model=DataResponse[NewsUpdateResponse])
def update_news(news_id: str, news_data: NewsUpdateRequest, news_service: NewsService = Depends()) -> Any:
    """
    API Update News
    """
    try:
        news = news_service.update_news(news_id, news_data)
        return DataResponse().success_response(data=news)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))
    
@router.post("/upload-news-from-file", response_model=DataResponse[List[NewsItemResponse]])
def upload_news_from_file(news_service: NewsService = Depends()) -> Any:
    """
    API để đọc file .txt và tạo các bài viết trong database
    """
    try:
        # Xác định thư mục hiện tại của script
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # Đường dẫn đến file output_file.txt
        output_file = os.path.join(current_dir, "output_file.txt")
        # Đọc và phân tích file
        news_list = NewsService.parse_news_from_file("/Users/ad2/Documents/VideoAI/scraper/output.html")
        print("fadsa", news_list)
        # Lưu từng bài viết vào database
        created_news = []
        for news in news_list:
            new_news = news_service.create_news(news)
            created_news.append(new_news)
        print("CREATED_NEWS", created_news)
        return DataResponse().success_response(data=created_news)
    except Exception as e:
        logger.error(e)
        return HTTPException(status_code=400, detail=str(e))