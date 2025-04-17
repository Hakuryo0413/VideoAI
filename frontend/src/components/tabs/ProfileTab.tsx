import React, { useEffect, useState } from "react";
import { Button, Input, Form, ConfigProvider } from "antd";

import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { UserDetail } from "@src/types/UserInterface";

const Profile: React.FC = () => {
  let navigate = useNavigate();
  const [detailMe, setDetailMe] = useState<UserDetail>(null);

  // useEffect(() => {
  //   const detailMe = async () => {
  //     try {
  //       const data = await getDetailMeInfo();
  //       setDetailMe(data);
  //       console.log("Fetched data:", data);
  //     } catch (error) {
  //       console.error("Error fetching news info", error);
  //     }
  //   };
  //   detailMe();
  // }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "white",
          },
          Button: {
            colorPrimary: "black",
          },
        },
      }}
    >
      <div className="space-y-6 px-40">
        <div className="bg-[#B75A4A] m-4 p-4 rounded-2xl">
          <Button
            type="text"
            className="!text-white"
            onClick={() => navigate("/table")}
          >
            <LeftOutlined />
            Back
          </Button>

          <p className="text-3xl text-center text-white font-medium ">
            MY PROFILE
          </p>
          <Form layout="vertical">
            <Form.Item label="Full Name" className="mb-4">
              <Input
                placeholder="Enter your fullname"
                value={detailMe?.full_name}
                // onChange={handleTitleChange}
                allowClear
              />
            </Form.Item>
            <Form.Item label="Email" className="mb-4">
              <Input
                placeholder="Enter your email"
                value={detailMe?.email}
                // onChange={handleTitleChange}
                allowClear
              />
            </Form.Item>
            <Form.Item label="API KEY D-ID" className="mb-4">
              <Input
                placeholder="Enter your API KEY"
                // value={newsTitle}
                // onChange={handleTitleChange}
                allowClear
              />
            </Form.Item>
          </Form>
          <div className="flex justify-center">
            <Button type="primary" size="large">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Profile;
