import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import { useParams } from "react-router-dom";
import NewsDetail from "@src/components/tabs/NewsDetail";

const NewsPage: React.FC = () => {
  const { news_id } = useParams();

  return (
    <div>
      <CommonHeader />
      <NewsDetail news_id={news_id} />
    </div>
  );
};

export default NewsPage;
