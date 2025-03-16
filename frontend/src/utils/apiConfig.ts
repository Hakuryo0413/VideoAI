import configKeys from "./config";

const apiConfig = {
  userLogin: `${configKeys.API_URL}login/`,
  userRegister: `${configKeys.API_URL}register/`,

  allNews: `${configKeys.API_URL}news`,
  newsById: `${configKeys.API_URL}news`,
  createNews: `${configKeys.API_URL}news`,
  updateNews: `${configKeys.API_URL}news`,

  allHistory: `${configKeys.API_URL}history`,
  historyById: `${configKeys.API_URL}history`,
  updateHistory: `${configKeys.API_URL}history`,
  historyByVideoId: `${configKeys.API_URL}history/video`,

  allVideo: `${configKeys.API_URL}video`,
  videoById: `${configKeys.API_URL}video`,
  createVideo: `${configKeys.API_URL}video`,
  updateVideo: `${configKeys.API_URL}video`,
  videoByNewsId: `${configKeys.API_URL}video/news`,
};

export default apiConfig;
