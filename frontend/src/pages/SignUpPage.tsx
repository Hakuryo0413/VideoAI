import Signup from "@src/components/auth/Signup";
import Footer from "@src/components/footer/Footer";
import CommonHeader from "@src/components/header/CommonHeader";
import React from "react";

const SignUpPage = () => {
  return (
    <div>
      <CommonHeader />
      <Signup />
      {/* <Footer /> */}
    </div>
  );
};

export default SignUpPage;
