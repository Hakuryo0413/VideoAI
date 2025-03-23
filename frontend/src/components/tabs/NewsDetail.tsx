import React, { useEffect, useState } from "react";
import { Button, Input, Select, Form, ConfigProvider } from "antd";
import { NewsInterface } from "@src/types/NewsInterface";
import { getNewsInfo } from "@src/features/news/NewsDetail";
import { createVideoFunc } from "@src/features/video/CreateVideo";
import { CreateVideoPayload } from "@src/types/VideoInterface";
import configKeys from "@src/utils/config";
import { CATEGORY } from "@src/types/common";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { TextArea } = Input;
const { Option } = Select;

interface ScriptTabProps {
  news_id: string;
}

const NewsDetail: React.FC<ScriptTabProps> = ({ news_id }) => {
  let navigate = useNavigate();
  const [newsInfo, setNewsInfo] = useState<NewsInterface | null>(null);
  const [videoInfo, setVideoInfo] = useState<CreateVideoPayload>({
    // news_id: news_id,
    name: newsInfo?.news_title,
    presenter_id: "v2_public_alyssa_red_suite_green_screen@46XonMxLFm",
    webhook: configKeys.WEBHOOK,
    script: {
      type: "text",
      subtitles: false,
      provider: {
        type: "microsoft",
        voice_id: "Sara",
      },
      input: newsInfo?.summary,
      ssml: false,
    },
    presenter_config: {
      crop: {
        type: "wide",
      },
    },
  });

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

  // Initialize form values when newsInfo is fetched
  useEffect(() => {
    if (newsInfo) {
      setVideoInfo({
        ...videoInfo,
        name: newsInfo?.news_title,
        script: {
          ...videoInfo?.script,
          input: newsInfo?.summary,
        },
      });
    }
  }, [newsInfo]);

  const submitGenerateVideo = async () => {
    try {
      console.log("Video info:", videoInfo);
      const response = await createVideoFunc(videoInfo, news_id);
      console.log("Create video:", response);
      window.location.replace("/table");
    } catch (error) {
      console.error("Error updating news", error);
    }
  };

  const categories = Object.values(CATEGORY);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "white",
          },
          Button: {
            colorPrimary: "black",
          },
        },
      }}
    >
      <div className="space-y-6 px-40">
        <div className="bg-[#B75A4A] m-4 p-4 rounded-2xl">
          <Button
            type="text"
            className="!text-white"
            onClick={() => navigate("/table")}
          >
            <LeftOutlined />
            Back
          </Button>

          <p className="text-3xl text-center text-white font-medium ">
            DETAIL NEWS
          </p>
          <Form layout="vertical">
            <Form.Item label="News ID" className="mb-4">
              <Input
                placeholder="Enter news_id"
                value={newsInfo?.news_id}
                allowClear
              />
            </Form.Item>
            <Form.Item label="News Title" className="mb-4">
              <Input
                placeholder="Enter news title"
                value={newsInfo?.news_title}
                allowClear
              />
            </Form.Item>

            <Form.Item label="Category" className="mb-4">
              <Select
                placeholder="Select a category"
                style={{ width: "100%" }}
                value={newsInfo?.category}
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
                value={newsInfo?.summary}
              />
            </Form.Item>
          </Form>

          <div className="flex justify-center">
            <Button type="primary" onClick={submitGenerateVideo} size="large">
              Generate Video
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default NewsDetail;
