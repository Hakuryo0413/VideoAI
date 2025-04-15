from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import subprocess
import requests
from fastapi import HTTPException

def summarize_content():
    try:
        # Chạy summary.py bằng cách gọi Python từ dòng lệnh
        result = subprocess.run(["python3", "/opt/airflow/scraper/app.py"], capture_output=True, text=True)
        print(result.stdout)  # In ra kết quả stdout
        if result.returncode == 0:
            print("✅ Summary script executed successfully.")
        else:
            print(f"❌ Summary script failed: {result.stderr}")
    except Exception as e:
        print(f"Error running summary: {str(e)}")

def check_health():
    try:
        # Gửi yêu cầu GET
        response = requests.get("https://app.backend.orb.local/healthcheck", verify=False)

        # Kiểm tra mã trạng thái HTTP
        if response.status_code == 200:
            print("✅ Server is healthy. Response:", response.json())  # In ra thông tin phản hồi (nếu có)
        else:
            print(f"❌ Health check failed. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        # Xử lý lỗi nếu có sự cố kết nối
        print(f"❌ Error during health check: {e}")

def upload_news_from_file_task():
    url = "https://app.backend.orb.local/news/upload-news-from-file"
    headers = {
    'accept': 'application/json',  # Đảm bảo chấp nhận định dạng JSON
    }
    
    try:
        # Đảm bảo URL của API đúng và có thể kết nối
        response = requests.post(url, headers=headers, data='', verify=False)
        # Kiểm tra mã trạng thái HTTP
        if response.status_code == 200:
            print(f"✅ News uploaded successfully: {response.json()}")
        else:
            print(f"❌ Failed to upload news. Status code: {response.status_code}")
            # Xử lý lỗi nếu API trả về mã lỗi
            raise HTTPException(status_code=response.status_code, detail="Failed to upload news")
    
    except requests.exceptions.RequestException as e:
        # Xử lý lỗi kết nối hoặc yêu cầu
        print(f"❌ Error during API call: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        # Xử lý các lỗi khác
        print(f"❌ An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
    

def save_video_by_id(video_id: str):
    try:
        # Địa chỉ API và các header
        api_url = "https://app.backend.orb.local/video/video_save"  # Cập nhật URL API của bạn
        headers = {
        'accept': 'application/json',  # Đảm bảo chấp nhận định dạng JSON
        }
        response = requests.get(f"{api_url}/{video_id}", headers=headers, verify=False)
        # Kiểm tra phản hồi
        if response.status_code == 200:
            video = response.json()
            print("VIDEOS: ", video)  # In ra video nhận được
        else:
            print(f"❌ Error during API call, Status code: {response.status_code}")
            raise Exception(f"Failed to get video, status code: {response.status_code}")
    
    except requests.exceptions.RequestException as e:
        # Xử lý lỗi liên quan đến yêu cầu HTTP
        print(f"Error during API call: {e}")
        raise Exception(f"Error during API call: {e}")
    
    except Exception as e:
        # Xử lý các lỗi khác
        print(f"Error during video save: {e}")
        raise Exception(f"Error during video save: {e}")

# Định nghĩa DAG
dag = DAG(
    'videoAI_dag',  # Tên DAG
    description='DAG to run VideoAI script',
    schedule_interval='@daily',  # Chạy DAG mỗi ngày
    start_date=datetime(2025, 4, 10),
    catchup=False,  # Không quay lại chạy các lần quá khứ
)

# check_health_task = PythonOperator(
#     task_id='check_health_task',  # Tên task
#     python_callable=check_health,  # Hàm kiểm tra sức khỏe server
#     dag=dag,
# )

summarize_task = PythonOperator(
    task_id='run_summary_task',  # Tên task
    python_callable=summarize_content,  # Hàm từ summary.py để thực thi
    dag=dag,
)

# Định nghĩa task trong DAG
# upload_news_task = PythonOperator(
#     task_id='upload_news_task',  # Tên task
#     python_callable=upload_news_from_file_task,  # Hàm gọi API
#     dag=dag,
# )

# save_video_task = PythonOperator(
#     task_id='save_video_task',  # Tên task
#     python_callable=save_video_by_id,  # Hàm gọi API
#     op_kwargs={'video_id': 'clp_oVV4t7S3U6qADgVySeyVu'},  # Thay thế video_id bằng ID thực tế
#     dag=dag,
# )

# youtube_task = PythonOperator(
#     task_id='upload_youtube_task',  # Tên task
#     python_callable=upload_youtube,  # Hàm gọi API
#     dag=dag,
# )

# check_health_task >> summarize_task >> upload_news_task >> save_video_task

# check_health_task >> save_video_task >> youtube_task
# youtube_task
summarize_task
