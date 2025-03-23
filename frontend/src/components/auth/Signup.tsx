import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Flex,
  Typography,
  Divider,
  ConfigProvider,
  Space,
} from "antd";

import Logo from "@src/assets/logo";
import Google from "@src/assets/googleLogo";
import LinkedIn from "@src/assets/linkedln";
import Facebook from "@src/assets/facebookLogo";
import { UserRegisterPayload } from "@src/types/UserInterface";
import { registerFunc } from "@src/features/auth/Register";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Signup: React.FC = () => {
  const register = async (payload: UserRegisterPayload) => {
    try {
      const data = await registerFunc(payload);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const onFinish = (values: UserRegisterPayload) => {
    console.log("Received values of form: ", values);
    register(values);
    window.location.href = "/login";
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "black",
          },
          Divider: {
            colorText: "white",
            colorSplit: "gray",
          },
        },
      }}
    >
      <div className="flex justify-center py-4 text-white">
        <div className="bg-[#B75A4A] p-8 rounded-2xl">
          {/* Logo and Header */}
          <div className="my-4 text-center">
            <div className="flex justify-center">
              <Logo />
            </div>
            <p className="my-4 text-3xl text-white"> Sign up to get started</p>
            <p className="text-sm font-medium">
              Transform your photos into talking digital people
            </p>
          </div>

          {/* Social Login Buttons */}
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {[
              { icon: <Google />, text: "Continue with Google" },
              { icon: <LinkedIn />, text: "Continue with LinkedIn" },
              { icon: <Facebook />, text: "Continue with Facebook" },
            ].map(({ icon, text }, index) => (
              <Button key={index} className="w-full !justify-start">
                <Flex align="center" gap={8}>
                  {React.cloneElement(icon, { style: { fontSize: "20px" } })}
                  <span className="font-light">{text}</span>
                </Flex>
              </Button>
            ))}
          </Space>

          <Divider plain>OR</Divider>

          {/* Login Form */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="full_name"
              rules={[
                { required: true, message: "Please input your Fullname!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Fullname" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                className="!text-white"
              >
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ marginTop: "20px", textAlign: "center" }}>
              <span className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="!text-orange-400">
                  Log in now!
                </Link>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Signup;
