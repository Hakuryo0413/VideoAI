import React, { use, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import apiConfig from "@src/utils/apiConfig";
import { VideoInterface } from "@src/types/VideoInterface";
import { getAllVideo } from "@src/features/video/VideoDetail";

const columns: TableProps<VideoInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "news_id",
    key: "news_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "news_title",
    key: "news_title",
  },
  {
    title: "Source_URL",
    dataIndex: "source_url",
    key: "source_url",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
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
  return <Table<VideoInterface> columns={columns} dataSource={dataVideo} />;
};

export default VideoTab;
