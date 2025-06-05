import os

from dotenv import load_dotenv
from openai import OpenAI

from utils import retry

load_dotenv()

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
Please summarize each of the following articles in 100 words each. Skip unnecessary introductions. Format the output as an HTML file where:
- The title is wrapped in an <h1> tag.
- The content is wrapped in an <h2> tag.
- The category is wrapped in an <h3> tag. Choose the category from the following list:
  - "Politics"
  - "Business"
  - "Technology"
  - "Sports"
  - "Entertainment"
  - "Health"
  - "Science"
- The raw url is wrapped in an <h4> tag and is unchanged from the file_content.
- Each article is separated by a <br> tag.

Example output format:
<h1>[Title]</h1>
<h2>[Content]</h2>
<h3>[Category]</h3>
<h4>[Url]</h4>
<br>

<h1>[Title]</h1>
<h2>[Content]</h2>
<h3>[Category]</h3>
<h4>[Url]</h4>
<br>

{file_content}
"""

# Gọi API để tóm tắt nội dung
summary_result = summarize(prompt)
print(summary_result)
# Lưu kết quả tóm tắt vào file output.html
output_html_path = os.path.join(current_dir, "output.html")
with open(output_html_path, "w", encoding="utf-8") as file:
    file.write(summary_result)

print(f"Kết quả đã được lưu vào: {output_html_path}")
