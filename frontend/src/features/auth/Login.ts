import { UserLoginPayload } from "@src/types/UserInterface";
import apiConfig from "@src/utils/apiConfig";

export const loginFunc = async (payload: UserLoginPayload): Promise<any> => {
  const response = await fetch(apiConfig.userLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  console.log("Login response:", res);
  return res;
};
