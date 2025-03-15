import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/LoginPage";
import SignUpPage from "@src/pages/SignUpPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default HomeRouter;
