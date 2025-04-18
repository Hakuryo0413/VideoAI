import React, { useEffect, useState } from "react";
import { Space, Table, Image } from "antd";
import type { TableProps } from "antd";
import { getAllPresenters } from "@src/features/presenter/PresenterDetail";
import { PresenterInterface } from "@src/types/PresenterInterface";
import CustomProvider from "../shared/CustomProvider";
import { Link } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const PresenterTab: React.FC = () => {
  const [dataPresenters, setDataPresenters] = useState<PresenterInterface[]>(
    []
  );
  const [image_url, setImageUrl] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const columns: TableProps<PresenterInterface>["columns"] = [
    {
      title: "Presenter ID",
      dataIndex: "presenter_id",
      key: "presenter_id",
      render: (text) => <a>{`${text.slice(0, 5)}...${text.slice(-5)}`}</a>,
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
          <Link to={""}>
            <EyeOutlined
              onClick={() => {
                setVisible(!visible);
                setImageUrl(record.image_url);
              }}
            />
          </Link>
          <Link to={""}>
            <DeleteOutlined />
          </Link>
        </Space>
      ),
    },
  ];
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
    <CustomProvider>
      <p className="text-xl my-2">Total: {dataPresenters.length} Presenters</p>
      <Table<PresenterInterface>
        columns={columns}
        dataSource={dataPresenters}
      />
      <Image
        width={200}
        style={{ display: "none" }}
        src={image_url}
        preview={{
          visible,
          src: image_url,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </CustomProvider>
  );
};

export default PresenterTab;
