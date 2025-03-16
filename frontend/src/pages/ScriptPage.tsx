import React from "react";
import CommonHeader from "@src/components/header/CommonHeader";
import ScriptTab from "@src/components/tabs/ScriptTab";
import { useParams } from "react-router-dom";

const ScriptPage: React.FC = () => {
  const { news_id } = useParams();

  return (
    <div>
      <CommonHeader />
      <ScriptTab news_id={news_id} />
    </div>
  );
};

export default ScriptPage;
