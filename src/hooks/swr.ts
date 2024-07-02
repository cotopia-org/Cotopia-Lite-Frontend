import axiosInstance from "@/lib/axios";
import useSWR, { SWRResponse } from "swr";

type ApiOptionsType = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: object;
  key?: string;
  isFetch?: boolean;
};

const initOptions: ApiOptionsType = {
  method: "GET",
  data: undefined,
  key: undefined,
  isFetch: true,
};

export const useApi = <T = any, X = any>(
  url: string,
  op?: ApiOptionsType
): SWRResponse<T, X> => {
  let isFetch = op?.isFetch ?? true;

  return useSWR(op?.key ?? url, async () => {
    if (!isFetch) return;

    const options = op ?? initOptions;

    const res = await axiosInstance({
      method: options.method,
      url,
      data: options.data,
    });
    return res.data;
  });
};

export const useNextApi = <T = any, X = any>(
  url: string
): SWRResponse<T, X> => {
  return useSWR(url, async () => {
    const res = await axiosInstance.get(url, {
      baseURL: "",
    });
    return res.data;
  });
};
