import React, { useEffect, useState } from "react";
import { ConfigProvider, Space, Table } from "antd";
import type { TableProps } from "antd";
import { NewsInterface } from "@src/types/NewsInterface";
import CustomTag from "../shared/CustomTag";
import { getAllPresenters } from "@src/features/presenter/PresenterDetail";
import { PresenterInterface } from "@src/types/PresenterInterface";

const columns: TableProps<PresenterInterface>["columns"] = [
  {
    title: "Presenter ID",
    dataIndex: "presenter_id",
    key: "presenter_id",
    render: (text, record) => (
      <a href={`news/${record.presenter_id}`}>
        {`${text.slice(0, 5)}...${text.slice(-5)}`}
      </a>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (text) => (
      <p
        className="capitalize
    "
      >
        {text}
      </p>
    ),
  },
  {
    title: "Preview URL",
    dataIndex: "preview_url",
    key: "preview_url",
    render: (text) => <a href={`${text}`}>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a href={`/edit/${record.presenter_id}`}>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const PresenterTab: React.FC = () => {
  const [dataPresenters, setDataPresenters] = useState<PresenterInterface[]>(
    []
  );
  useEffect(() => {
    console.log("fetching news");
    const fetchNews = async () => {
      try {
        const data = await getAllPresenters();
        setDataPresenters(data);
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
      <p className="text-xl my-2">Total: {dataPresenters.length} News</p>
      <Table<PresenterInterface>
        columns={columns}
        dataSource={dataPresenters}
      />
    </ConfigProvider>
  );
};

export default PresenterTab;
