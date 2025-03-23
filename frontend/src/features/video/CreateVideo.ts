import { CreateVideoPayload } from "@src/types/VideoInterface";
import apiConfig from "@src/utils/apiConfig";

export const createVideoFunc = async (
  payload: CreateVideoPayload,
  news_id: string
): Promise<any> => {
  const response = await fetch(`${apiConfig.createVideo}?news_id=${news_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  return res;
};
