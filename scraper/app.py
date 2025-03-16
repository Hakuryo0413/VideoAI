import subprocess
import os

from dotenv import load_dotenv
from openai import OpenAI

from utils import retry

load_dotenv()
p1 = subprocess.Popen(["python", "-u", "scraper.py"])
p1.wait()

# Xác định thư mục hiện tại của script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Đọc nội dung file output_file.txt từ thư mục hiện tại
output_file = os.path.join(current_dir, "output_file.txt")

with open(output_file, "r", encoding="utf-8") as file:
    file_content = file.read().strip()

# Gọi OpenRouter API
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("DEEPSEEK_API_KEY"),
)


@retry(times=3, exceptions=(Exception))
def summarize(content: str) -> str | None:
    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",
            messages=[{"role": "user", "content": f"{content}"}],
            temperature=0,
        )
    except:
        raise

    # Lấy kết quả tóm tắt
    summary_result = completion.choices[0].message.content

    return summary_result


# Tạo prompt tóm tắt từ nội dung file
prompt = f"""
Please summarize each of the following articles in 200 words each. Skip unnecessary introductions. Format the output as follows:
**Article 1 Summary:**
[Summary]

**Article 2 Summary:**
[Summary]

{file_content}
"""

print(prompt)


# Gọi API để tóm tắt nội dung
summary_result = summarize(prompt)

# Lưu kết quả tóm tắt vào file summary.txt
summary_output = os.path.join(current_dir, "summary.txt")
with open(summary_output, "w", encoding="utf-8") as f:
    f.write(summary_result)

print(f"Kết quả đã được lưu vào: {summary_output}")
