import configKeys from "./config";

const apiConfig = {
  userLogin: `${configKeys.API_URL}login/`,
  userRegister: `${configKeys.API_URL}register/`,

  allNews: `${configKeys.API_URL}news?page_size=100&page=1&sort_by=id&order=desc`,
  newsById: `${configKeys.API_URL}news`,
  createNews: `${configKeys.API_URL}news`,
  updateNews: `${configKeys.API_URL}news`,

  allHistory: `${configKeys.API_URL}history`,
  historyById: `${configKeys.API_URL}history`,
  updateHistory: `${configKeys.API_URL}history`,
  historyByVideoId: `${configKeys.API_URL}history/video`,

  allVideo: `${configKeys.API_URL}video?page_size=100&page=1&sort_by=id&order=desc`,
  videoById: `${configKeys.API_URL}video`,
  createVideo: `${configKeys.API_URL}video`,
  updateVideo: `${configKeys.API_URL}video`,
  videoByNewsId: `${configKeys.API_URL}video/news`,
  videoSaveById: `${configKeys.API_URL}video/video_save`,

  allPresenter: `${configKeys.API_URL}presenter`,
};

export default apiConfig;
