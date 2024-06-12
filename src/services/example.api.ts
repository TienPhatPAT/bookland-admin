import APIInstance from "@/utils/apiConfig";

export const ExampleApi = {
  getExample: async (params: { version: string; helpers: string }): Promise<string> => {
    const response = await APIInstance.get("/getMdocSummaries", {
      params,
    });
    return response.data;
  },
};
