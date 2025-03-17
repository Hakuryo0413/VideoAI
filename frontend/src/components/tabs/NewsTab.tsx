import React, { useEffect, useState } from "react";
import { ConfigProvider, Space, Table } from "antd";
import type { TableProps } from "antd";
import { NewsInterface } from "@src/types/NewsInterface";
import { getAllNews } from "@src/features/news/NewsDetail";
import CustomTag from "../shared/CustomTag";

const columns: TableProps<NewsInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "news_id",
    key: "news_id",
    render: (text, record) => (
      <a href={`news/${record.news_id}`}>
        {`${text.slice(0, 5)}...${text.slice(-5)}`}
      </a>
    ),
  },
  {
    title: "Title",
    dataIndex: "news_title",
    key: "news_title",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => <CustomTag category={text} />,
  },
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
    console.log("fetching news");
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        setDataNews(data);
      } catch (error) {
        console.error("Error fetching all news", error);
      }
    };
    fetchNews();
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
      <p className="text-xl my-2">Total: {dataNews.length} News</p>
      <Table<NewsInterface> columns={columns} dataSource={dataNews} />
    </ConfigProvider>
  );
};

export default NewsTab;
