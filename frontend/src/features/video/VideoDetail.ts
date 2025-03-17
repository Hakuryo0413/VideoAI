import apiConfig from "@src/utils/apiConfig";

export const getAllVideo = async (): Promise<any> => {
  try {
    const response = await fetch(apiConfig.allVideo);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching all news", error);
  }
};
