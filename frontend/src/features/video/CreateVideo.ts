import { CreateVideoPayload } from "@src/types/VideoInterface";
import apiConfig from "@src/utils/apiConfig";

export const createVideoFunc = async (payload: CreateVideoPayload): Promise<any> => {
    const response = await fetch(apiConfig.createVideo, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const res = await response.json();
    return res;
    }