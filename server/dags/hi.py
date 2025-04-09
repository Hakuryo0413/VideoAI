from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator


dafault_args = {
    'owner': 'airflow',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}

with DAG(
    dag_id="hi",
    default_args=dafault_args,
    description="My first DAG",
    schedule_interval='@daily',
    start_date=datetime(2025, 4, 9, 2),
    catchup=False, 
) as dag:
    task1 = BashOperator(
        task_id='task1',
        bash_command='echo "Hello World!" ',
    )

    task1