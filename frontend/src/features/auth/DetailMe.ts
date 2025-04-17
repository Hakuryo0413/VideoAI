import apiConfig from "@src/utils/apiConfig";

export const getDetailMeInfo = async (): Promise<any> => {
  try {
    const response = await fetch(`${apiConfig.detailMe}`, {
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
