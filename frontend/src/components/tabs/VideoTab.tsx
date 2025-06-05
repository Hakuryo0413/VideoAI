import React, { use, useEffect, useState } from "react";
import { Modal, Select, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { UpdateStatusPayload, VideoInterface } from "@src/types/VideoInterface";
import {
  downloadVideoInfo,
  getAllVideo,
  updateStatusVideo,
} from "@src/features/video/VideoDetail";
import { dateFormater } from "@src/utils/common";
import CustomProvider from "../shared/CustomProvider";
import { Link } from "react-router-dom";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

const VideoTab: React.FC = () => {
  const [dataVideo, setDataVideo] = useState<VideoInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoId, setVideoId] = useState<string>("");
  const [statusVideo, setStatusVideo] = useState("");
  const [update, setUpdate] = useState<UpdateStatusPayload>({
    status: statusVideo,
  });

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={""}>
            <EditOutlined
              onClick={() => {
                setVideoId(record.id);
                showModal();
              }}
            />
          </Link>
          <Link to={""}>
            <DownloadOutlined onClick={() => downloadVideo(record.id)} />
          </Link>
        </Space>
      ),
      width: "20px",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateStatus(videoId, update);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setStatusVideo(value);
  };

  useEffect(() => {
    setUpdate({
      status: statusVideo,
    });
  }, [statusVideo]);

  const updateStatus = async (
    video_id: string,
    update: UpdateStatusPayload
  ) => {
    try {
      const data = await updateStatusVideo(video_id, update);
      console.log("Updated status:", data);
      fetchVideo();
    } catch (error) {
      console.error("Error updating video status", error);
    }
  };
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

  useEffect(() => {
    fetchVideo();
  }, []);

  const downloadVideo = async (video_id: string) => {
    try {
      const data = await downloadVideoInfo(video_id);
      console.log("Downloaded data:", data);
    } catch (error) {
      console.error("Error downloading video", error);
    }
  };

  return (
    <CustomProvider>
      <p className="text-xl my-2">Total: {dataVideo.length} Videos</p>

      <Table<VideoInterface> columns={columns} dataSource={dataVideo} />

      <Modal
        title="Update Video Detail"
        open={isModalOpen}
        centered
        onOk={() => handleOk()}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium">Video ID</label>
            <p className="text-sm font-medium">{videoId}</p>
          </div>

          <label className="text-sm font-medium">Status</label>
          <Select
            value={statusVideo}
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: "reviewed", label: "Reviewed" },
              { value: "deny", label: "Deny" },
            ]}
          />
        </div>
      </Modal>
    </CustomProvider>
  );
};

export default VideoTab;
