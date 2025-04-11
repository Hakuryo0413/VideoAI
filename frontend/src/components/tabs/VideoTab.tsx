import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { VideoInterface } from "@src/types/VideoInterface";
import { getAllVideo } from "@src/features/video/VideoDetail";
import { dateFormater } from "@src/utils/common";
import CustomProvider from "../shared/CustomProvider";
import { Link } from "react-router-dom";

const columns: TableProps<VideoInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text, record) => (
      <Link to={`/video/${record.id}`}>
        {`${text.slice(0, 5)}...${text.slice(-5)}`}
      </Link>
    ),
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        {text}
      </div>
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => <p>{dateFormater(text)}</p>,
    width: "40px",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Tag color={text === "done" ? "green" : "red"}>
        <p className="uppercase">{text}</p>
      </Tag>
    ),
  },
  {
    title: "Presenter ID",
    dataIndex: "presenter_id",
    key: "presenter_id",
  },
];

const VideoTab: React.FC = () => {
  const [dataVideo, setDataVideo] = useState<VideoInterface[]>([]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getAllVideo();
        data.forEach((video: VideoInterface) => {
          video.created_at = new Date(video.created_at);
        });
        setDataVideo(data);
      } catch (error) {
        console.error("Error fetching all news", error);
      }
    };
    fetchVideo();
  }, []);
  return (
    <CustomProvider>
      <p className="text-xl my-2">Total: {dataVideo.length} Videos</p>

      <Table<VideoInterface> columns={columns} dataSource={dataVideo} />
    </CustomProvider>
  );
};

export default VideoTab;
