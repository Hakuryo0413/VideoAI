import React from "react";
import { Tabs } from "antd";
import VideoTab from "./tabs/VideoTab";
import HistoryTab from "./tabs/HistoryTab";
import NewsTab from "./tabs/NewsTab";

const Home: React.FC = () => (
  <div className="mx-8">
    <Tabs
      defaultActiveKey="1"
      centered
      items={[
        {
          label: "News",
          key: "1",
          children: (
            <>
              <NewsTab />
            </>
          ),
        },
        {
          label: "Video",
          key: "2",
          children: (
            <>
              <VideoTab />
            </>
          ),
        },
        {
          label: "History",
          key: "3",
          children: (
            <>
              <HistoryTab />
            </>
          ),
        },
      ]}
    />
  </div>
);

export default Home;
