import apiConfig from "@src/utils/apiConfig";

export const getNewsInfo = async (news_id: string): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.newsById}/${news_id}`, {
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
