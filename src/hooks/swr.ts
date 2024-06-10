import axiosInstance from "@/lib/axios";
import useSWR, { SWRResponse } from "swr";

export const useApi = <T = any, X = any>(url: string): SWRResponse<T, X> => {
  return useSWR(url, async () => {
    const res = await axiosInstance.get(url);
    return res.data;
  });
};
