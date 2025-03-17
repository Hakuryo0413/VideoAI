import apiConfig from "@src/utils/apiConfig";

export const getAllPresenters = async (): Promise<any> => {
    try {
      const response = await fetch(apiConfig.allPresenter);
      const data = await response.json();
      console.log("data", data);
      return data.data;
    } catch (error) {
      console.error("Error fetching all news", error);
    }
  };
  