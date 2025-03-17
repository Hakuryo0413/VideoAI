import { CATEGORY } from "@src/types/common";
import { Tag } from "antd";
import React from "react";

interface TagProps {
  category: string;
}

const categoryConfig = {
  [CATEGORY.POLITICS]: {
    color: "red",
  },
  [CATEGORY.BUSINESS]: {
    color: "green",
  },
  [CATEGORY.TECHNOLOGY]: {
    color: "blue",
  },
  [CATEGORY.SPORTS]: {
    color: "yellow",
  },
  [CATEGORY.ENTERTAINMENT]: {
    color: "purple",
  },
  [CATEGORY.HEALTH]: {
    color: "orange",
  },
  [CATEGORY.SCIENCE]: {
    color: "cyan",
  },
};

const CustomTag: React.FC<TagProps> = ({ category }) => {
  // Lấy cấu hình màu sắc từ categoryConfig
  const config = categoryConfig[category as CATEGORY];

  // Nếu không tìm thấy cấu hình, sử dụng màu mặc định
  const color = config ? config.color : "default";

  return (
    <Tag color={color} key={category}>
      {category.toUpperCase()}
    </Tag>
  );
};

export default CustomTag;
