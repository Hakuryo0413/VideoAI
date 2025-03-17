import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import apiConfig from "@src/utils/apiConfig";
import { HistoryInterface } from "@src/types/HistoryInterface";

const columns: TableProps<HistoryInterface>["columns"] = [
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

const HistoryTab: React.FC = () => {
  const [dataNews, setDataNews] = useState<HistoryInterface[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(apiConfig.allNews);
      const data = await response.json();
      setDataNews(data.data);
    };
    fetchNews();
  }, []);
  return <Table<HistoryInterface> columns={columns} dataSource={dataNews} />;
};

export default HistoryTab;
