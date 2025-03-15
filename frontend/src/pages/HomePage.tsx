import React from "react";
import Footer from "@src/components/footer/Footer";
import CommonHeader from "@src/components/header/CommonHeader";
import Home from "@src/components/Home";

const HomePage = () => {
  return (
    <div>
      <CommonHeader />
      <Home /> 
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
