import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/LoginPage";
import NewsPage from "@src/pages/NewsPage";
import ScriptPage from "@src/pages/ScriptPage";
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
        <Route path="/edit/:news_id" element={<ScriptPage />} />
        <Route path="/news/:news_id" element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default HomeRouter;
