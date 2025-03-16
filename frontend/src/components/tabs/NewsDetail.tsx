import React, { useEffect, useState } from "react";
import { Button, Input, Select, Form } from "antd";
import { NewsInterface, UpdateNewsInterface } from "@src/types/NewsInterface";
import { getNewsInfo } from "@src/features/news/NewsDetail";
import { updateNewsFunc } from "@src/features/news/UpdateNews";

const { TextArea } = Input;
const { Option } = Select;

interface ScriptTabProps {
  news_id: string;
}

const NewsDetail: React.FC<ScriptTabProps> = ({ news_id }) => {
  const [script, setScript] = useState("");
  const [newsInfo, setNewsInfo] = useState<NewsInterface | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [category, setCategory] = useState("");
  const [updateNews, setUpdateNews] = useState<UpdateNewsInterface>({
    summary: script,
    news_title: newsTitle,
    category: category,
    updated_at: new Date(),
  });

  const handleScriptChange = (e) => {
    setScript(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNewsTitle(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  // Fetch news info when news_id changes
  useEffect(() => {
    const fetchNewsInfo = async () => {
      try {
        const data = await getNewsInfo(news_id);
        setNewsInfo(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching news info", error);
      }
    };

    fetchNewsInfo();
  }, [news_id]);

  // Update updateNews state when any of the input fields change
  useEffect(() => {
    setUpdateNews({
      ...updateNews,
      summary: script,
      news_title: newsTitle,
      category: category,
    });
  }, [script, newsTitle, category]);

  // Initialize form values when newsInfo is fetched
  useEffect(() => {
    if (newsInfo) {
      console.log("newsInfo updated:", newsInfo);
      setScript(newsInfo.summary || "");
      setNewsTitle(newsInfo.news_title || "");
      setCategory(newsInfo.category || "");
    }
  }, [newsInfo]);

  const submitUpdateNews = async () => {
    try {
      const response = await updateNewsFunc(news_id, updateNews);
      console.log("Updated news:", response);
      window.location.replace("/");
    } catch (error) {
      console.error("Error updating news", error);
    }
  };

  const categories = [
    "Politics",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
  ];

  return (
    <div className="space-y-6">
      <Form layout="vertical">
        <Form.Item label="News Title" className="mb-4">
          <Input
            placeholder="Enter news title"
            value={newsTitle}
            onChange={handleTitleChange}
            allowClear
          />
        </Form.Item>

        <Form.Item label="Category" className="mb-4">
          <Select
            placeholder="Select a category"
            style={{ width: "100%" }}
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Script" className="mb-4">
          <TextArea
            placeholder="Edit your script here"
            rows={12}
            showCount
            allowClear
            onChange={handleScriptChange}
            value={script}
          />
        </Form.Item>
      </Form>

      <div className="flex justify-center">
        <Button type="primary" onClick={submitUpdateNews} size="large">
          Generate Video
        </Button>
      </div>
    </div>
  );
};

export default NewsDetail;
