from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import subprocess


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

# Định nghĩa DAG
dag = DAG(
    'videoAI_dag',  # Tên DAG
    description='DAG to run VideoAI script',
    schedule_interval='@daily',  # Chạy DAG mỗi ngày
    start_date=datetime(2025, 4, 10),
    # schedule=SometimeAfterWorkdayTimetable(Time(8)),  # Chạy sau giờ làm việc
    catchup=False,  # Không quay lại chạy các lần quá khứ
)


summarize_task = PythonOperator(
    task_id='run_summary_task',  # Tên task
    python_callable=summarize_content,  # Hàm từ summary.py để thực thi
    dag=dag,
)



summarize_task 
