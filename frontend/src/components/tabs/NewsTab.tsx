import React, { use, useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { NewsInterface } from "@src/types/NewsInterface";
import apiConfig from "@src/utils/apiConfig";

const columns: TableProps<NewsInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "news_id",
    key: "news_id",
    render: (text, record) => <a href={`news/${record.news_id}`}>{text}</a>,
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
    render: (text) => <a>{text}</a>,
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
        <a href={`/edit/${record.news_id}`}>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const NewsTab: React.FC = () => {
  const [dataNews, setDataNews] = useState<NewsInterface[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(apiConfig.allNews);
      const data = await response.json();
      setDataNews(data.data);
    };
    fetchNews();
  }, []);
  return <Table<NewsInterface> columns={columns} dataSource={dataNews} />;
};

export default NewsTab;
