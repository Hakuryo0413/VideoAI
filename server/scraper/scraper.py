# import the required library
import logging
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

# instantiate a Chrome options object
options = webdriver.ChromeOptions()

# set the options to use Chrome in headless mode
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")  # Thường dùng trong Docker
options.add_argument("--disable-dev-shm-usage")  # Giảm sử dụng bộ nhớ chia sẻ
options.add_argument("--disable-gpu")  # Tắt GPU nếu không cần thiết

# initialize an instance of the Chrome driver (browser) in headless mode
driver = webdriver.Chrome(options=options)
# logging.basicConfig(level=logging.DEBUG)

# # visit your target site
driver.get("https://edition.cnn.com/")
time.sleep(3)  # Chờ trang tải dữ liệu

# articles = driver.find_elements(By.CSS_SELECTOR, ".card.container__item")[:1]

try:
    # Lấy danh sách bài báo (giới hạn 1 bài đầu tiên)
    articles = driver.find_elements(By.CSS_SELECTOR, ".card.container__item")[:1]
    
    # Kiểm tra nếu articles có dữ liệu
    if articles:
        print(f"✅ Đã lấy được {len(articles)} bài báo.")
    else:
        print("❌ Không tìm thấy bài báo nào.")
        
except Exception as e:
    print(f"❌ Lỗi khi lấy bài báo: {str(e)}")


# Danh sách để lưu tiêu đề & URL bài báo
print(articles)
article_urls = []
article_titles = []

for index, article in enumerate(articles, start=1):
    try:
        url = article.find_element(By.TAG_NAME, "a").get_attribute("href")
        title_element = article.find_element(By.TAG_NAME, "span")
        title = title_element.text

        article_urls.append(url)
        article_titles.append(title)

    except Exception as e:
        print(f"Lỗi khi lấy bài {index}: {str(e)}")

# Danh sách để lưu nội dung bài báo
news_data = []

print("vuongankit")
# Duyệt qua từng bài báo và thu thập dữ liệu
for index, (title, url) in enumerate(zip(article_titles, article_urls), start=1):
    try:
        # Truy cập trang bài báo trên Báo Mới
        driver.get(url)
        time.sleep(3)  # Đợi trang tải

        try:
            full_content = driver.find_element(By.CLASS_NAME, "article__content")
            paragraphs = full_content.find_elements(By.TAG_NAME, "p")
            content = "\n".join([p.text for p in paragraphs if p.text.strip()])
        except:
            pass

        # Lưu dữ liệu vào danh sách
        news_data.append((title, url, content))

        print(f"✅ Hoàn tất bài {index}")

    except Exception as e:
        print(f"❌ Lỗi khi lấy bài {index}: {str(e)}")

# Đóng trình duyệt sau khi hoàn thành
driver.quit()

with open("output_file.txt", "w", encoding="utf-8") as f:
    f.write("Dữ liệu bài báo:\n")
    for index, (title, url, content) in enumerate(news_data, start=1):
        try:
            f.write(f"Article {index}: {title} \n")
            f.write(content)
            f.write("\n")
            print(f"✅ Đã lưu bài {index}: {title}")
        except Exception as e:
            print(f"❌ Lỗi khi ghi bài {index} vào tệp: {str(e)}")

print("📂 Dữ liệu đã được lưu vào file output_file.txt")
