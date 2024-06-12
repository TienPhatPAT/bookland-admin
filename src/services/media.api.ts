import { API } from "@/constants";
import APIInstance from "@/utils/apiConfig";

export const MediaApi = {
  createSigned: async (data: { [keyword: string]: string }): Promise<void> => {
    return APIInstance.post(API.MEDIA.UPLOAD, data);
  },
  s3tracking: (url: string, data: FormData): Promise<string> => {
    return APIInstance.post(url, data, {
      baseURL: url,
      headers: { "Content-Type": "multipart/form-data", Authorization: "", noAuth: true },
    }).then((res) => {
      return res.data;
    });
  },
};
