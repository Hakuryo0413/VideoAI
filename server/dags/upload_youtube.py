from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import subprocess
from airflow.exceptions import AirflowException  # Use AirflowException for errors

def upload_youtube():
    try:
        result = subprocess.run(["python3", "/opt/airflow/youtube/main.py"], capture_output=True, text=True)
        print("adiusfjisdjf")
        print(result)
        if result.returncode == 0:
            print(f"✅ Upload to YouTube successful: {result.stdout}")
        else:
            print(f"❌ Failed to upload to YouTube. Error: {result.stderr}")
            raise AirflowException("Failed to upload to YouTube.")

    except Exception as e:
        print(f"Error during uploading to YouTube: {e}")
        raise AirflowException(str(e))

dag = DAG(
    'upload_youtube_dag',
    description='DAG to run upload video on Youtube',
    schedule_interval='@daily',
    start_date=datetime(2025, 4, 10),
    catchup=False, 
)

youtube_task = PythonOperator(
    task_id='upload_youtube_task',
    python_callable=upload_youtube,
    dag=dag,
)

youtube_task
