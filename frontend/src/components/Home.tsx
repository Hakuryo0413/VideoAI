import React from "react";
import { ConfigProvider, Tabs } from "antd";
import VideoTab from "./tabs/VideoTab";
import HistoryTab from "./tabs/HistoryTab";
import NewsTab from "./tabs/NewsTab";
import PresenterTab from "./tabs/PresenterTab";

const Home: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          colorText: "white",
          itemColor: "white",
          itemHoverColor: "orange",
          itemSelectedColor: "orange",
          inkBarColor: "orange",
        },
      },
    }}
  >
    <div className="mx-8 px-40">
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
          {
            label: "Presenter",
            key: "4",
            children: (
              <>
                <PresenterTab />
              </>
            ),
          },
        ]}
      />
    </div>
  </ConfigProvider>
);

export default Home;
