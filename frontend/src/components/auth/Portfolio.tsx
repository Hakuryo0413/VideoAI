import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const links = [
  { name: "Phù hợp cho tất cả giai đoạn phát triển", href: "#" },
  { name: "Dự án đa dạng", href: "#" },
  { name: "Tự mình khám phá và trải nghiệm", href: "#" },
];
const stats = [
  { name: "Dự án", value: "1000+" },
  { name: "Nhà sáng lập", value: "100+" },
  { name: "Miễn phí", value: "Không giới hạn" },
];

function Portfolio() {
  const navigate = useNavigate();
  return (
    <div className="pt-2">
      <img
        src="https://res-console.cloudinary.com/dkglfu0md/media_explorer_thumbnails/5fc329e680ba6c7bcf4c84db8ec68088/detailed"
        alt="Image"
        className="absolute"
      />
      <div className="max-w-8xl px-6 lg:px-8 absolute pt-40">
        <div className="flex items-center" style={{ marginTop: -20 }}>
          <div className="text-center px-70">
            <h2 className="text-3xl text-[#f4f2f0] font-black font-mono  sm:text-7xl">
              Create News Video In Minutes
            </h2>
            <p className="mt-6 text-xl leading-8 text-[16px] text-gray-300 font-semibold">
              Turn complex news articles into engaging videos that inform and
              inspire — all with the power of intelligent automation designed
              for modern journalism.
            </p>
            <Button
              className="mt-6 !bg-orange-500 !text-white !border-none"
              onClick={() => navigate("/table")}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
