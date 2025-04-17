import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/LoginPage";
import NewsPage from "@src/pages/NewsPage";
import Portfolio from "@src/pages/Portfolio";
import ProfilePage from "@src/pages/ProfilePage";
import ScriptPage from "@src/pages/ScriptPage";
import SignUpPage from "@src/pages/SignUpPage";
import VideoPage from "@src/pages/VideoPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

function HomeRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/table" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/edit/:news_id" element={<ScriptPage />} />
        <Route path="/news/:news_id" element={<NewsPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default HomeRouter;
