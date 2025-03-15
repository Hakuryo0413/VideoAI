import React from "react";
import Footer from "@src/components/footer/Footer";
import CommonHeader from "@src/components/header/CommonHeader";
import Login from "@src/components/auth/Login";

const LoginPage = () => {
  return (
    <div>
      <CommonHeader />
      <Login /> 
      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
