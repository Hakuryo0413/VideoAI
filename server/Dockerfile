FROM apache/airflow:2.10.5

# Cài đặt Chromium và Chromedriver
USER root

RUN apt-get update && \
    apt-get install -y chromium chromium-driver

USER airflow

# Cài đặt selenium
RUN pip install openai
