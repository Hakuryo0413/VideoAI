import { UpdateNewsInterface } from "@src/types/NewsInterface";
import apiConfig from "@src/utils/apiConfig";

export const updateNewsFunc = async (
  news_id: string,
  payload: UpdateNewsInterface
): Promise<any> => {
  const response = await fetch(`${apiConfig.updateNews}/${news_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  console.log("faasdf", payload);
  return res;
};
