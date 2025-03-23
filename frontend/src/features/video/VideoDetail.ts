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

export const getVideoInfo = async (video_id: string): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.videoSaveById}/${video_id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching news info", error);
  }
}