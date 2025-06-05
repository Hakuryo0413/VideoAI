import { UpdateStatusPayload } from "@src/types/VideoInterface";
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

export const downloadVideoInfo = async (video_id: string): Promise<any> => {
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
};

export const getVideoDetail = async (video_id: string): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.videoById}/${video_id}`, {
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
};

export const updateStatusVideo = async (
  video_id: string,
  payload: UpdateStatusPayload
): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.videoUpdateStatus}/${video_id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news info", error);
  }
};
