import apiConfig from "@src/utils/apiConfig";

export const deleteNewsFunc = async (news_id: string): Promise<any> => {
  const response = await fetch(`${apiConfig.deleteNews}/${news_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return res;
};
