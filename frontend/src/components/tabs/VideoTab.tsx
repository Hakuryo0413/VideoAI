import React, { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import type { TableProps } from "antd";
import { VideoInterface } from "@src/types/VideoInterface";
import { getAllVideo } from "@src/features/video/VideoDetail";

const columns: TableProps<VideoInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text, record) => (
      <a href={`video/${record.id}`}>
        {`${text.slice(0, 5)}...${text.slice(-5)}`}
      </a>
    ),
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Source_URL",
    dataIndex: "result_url",
    key: "result_url",
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
        setDataVideo(data);
      } catch (error) {
        console.error("Error fetching all news", error);
      }
    };
    fetchVideo();
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingBlock: 8,
          },
        },
      }}
    >
      <Table<VideoInterface> columns={columns} dataSource={dataVideo} />
    </ConfigProvider>
  );
};

export default VideoTab;
