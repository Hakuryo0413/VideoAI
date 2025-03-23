import React, { useEffect, useState } from "react";
import { ConfigProvider, Space, Table } from "antd";
import type { TableProps } from "antd";
import { NewsInterface } from "@src/types/NewsInterface";
import { getAllNews } from "@src/features/news/NewsDetail";
import CustomTag from "../shared/CustomTag";
import { dateFormater } from "@src/utils/common";
import CustomProvider from "../shared/CustomProvider";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns: TableProps<NewsInterface>["columns"] = [
  {
    title: "ID",
    dataIndex: "news_id",
    key: "news_id",
    render: (text, record) => (
      <Link to={`/news/${record.news_id}`}>
        {`${text.slice(0, 5)}...${text.slice(-5)}`}
      </Link>
    ),
    width: "20px",
  },
  {
    title: "Title",
    dataIndex: "news_title",
    key: "news_title",
    width: "200px",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (text, record) => <p>{dateFormater(record.updated_at)}</p>,
    width: "40px",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => <CustomTag category={text} />,
    width: "20px",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/edit/${record.news_id}`}>
          <EditOutlined />
        </Link>
        <Link to={""}>
          <DeleteOutlined />
        </Link>
      </Space>
    ),
    width: "20px",
  },
];
const NewsTab: React.FC = () => {
  const [dataNews, setDataNews] = useState<NewsInterface[]>([]);
  useEffect(() => {
    console.log("fetching news");
    const fetchNews = async () => {
      try {
        const data = await getAllNews();
        data.forEach((news: NewsInterface) => {
          news.updated_at = new Date(news.updated_at);
        });
        setDataNews(data);
      } catch (error) {
        console.error("Error fetching all news", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <CustomProvider>
      <p className="text-xl my-2">Total: {dataNews.length} News</p>
      <Table<NewsInterface> columns={columns} dataSource={dataNews} />
    </CustomProvider>
  );
};

export default NewsTab;
