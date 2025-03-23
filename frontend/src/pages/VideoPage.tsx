import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import { useParams } from "react-router-dom";
import VideoDetailTab from "@src/components/tabs/VideoDetailTab";

const VideoPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <CommonHeader />
      <VideoDetailTab video_id={id} />
    </div>
  );
};

export default VideoPage;
