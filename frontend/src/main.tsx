import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import { OpenAPI } from "./client";

OpenAPI.BASE = import.meta.env.VITE_API_URL

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
