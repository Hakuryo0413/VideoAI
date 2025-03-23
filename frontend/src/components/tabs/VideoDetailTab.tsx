import React, { useEffect, useState } from "react";
import { Button, Input, Form, ConfigProvider } from "antd";
import { VideoInterface } from "@src/types/VideoInterface";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getVideoInfo } from "@src/features/video/VideoDetail";

const { TextArea } = Input;

interface ScriptTabProps {
  video_id: string;
}

const VideoDetailTab: React.FC<ScriptTabProps> = ({ video_id }) => {
  let navigate = useNavigate();
  const [videoInfo, setVideoInfo] = useState<VideoInterface | null>(null);

  // Fetch news info when news_id changes
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const data = await getVideoInfo(video_id);
        setVideoInfo(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching news info", error);
      }
    };
    fetchVideoInfo();
  }, [video_id]);

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
            DETAIL VIDEO
          </p>
          <Form layout="vertical">
            <Form.Item label="Video ID" className="mb-4">
              <Input placeholder="Enter video_id" value={video_id} allowClear />
            </Form.Item>
            <Form.Item label="Video Name" className="mb-4">
              <Input
                placeholder="Enter video name"
                value={videoInfo?.name}
                allowClear
              />
            </Form.Item>

            

            <Form.Item label="Script" className="mb-4">
              <TextArea
                placeholder="Edit your script here"
                rows={12}
                showCount
                allowClear
                value={videoInfo?.result_url}
              />
            </Form.Item>
          </Form>

          {/* <div className="flex justify-center">
            <Button type="primary" onClick={submitGenerateVideo} size="large">
              Generate Video
            </Button>
          </div> */}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default VideoDetailTab;
