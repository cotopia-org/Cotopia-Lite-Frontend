import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

type ErrorResponseObjectType = {
  field: string;
  message: string;
};

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    ["Content-Type"]: "application/json",
  },
});

// Add a request interceptor to add authorization headers
axiosInstance.interceptors.request.use(
  (config: any) => {
    if (typeof window === "undefined") return config;

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config?.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const currencyCode = localStorage.getItem("x-currency");
    if (currencyCode && config?.headers) {
      config.headers["x-currency"] = currencyCode;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to refresh access token if needed
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error response status is 401 and the request was not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Perform token refresh logic here
      try {
        const newAccessToken = await refreshAccessToken(); // Implement your refresh token logic
        if (newAccessToken) {
          // Retry the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        //Signing out the user here
        //TODO - Add logic here
      }
    }

    const errorData = error.response.data;

    if (errorData?.["detail"] && typeof errorData["detail"] === "string") {
      //Means we have error string as detail
      toast.error(errorData.detail);
    }

    return Promise.reject(error);
  }
);

// Function to refresh access token
async function refreshAccessToken(): Promise<string | null> {
  // console.log("axios", axiosInstance.defaults.headers.common["Authorization"]);

  // const accessToken = localStorage.getItem("accessToken");

  // const response = await axiosInstance.get("/users/token");
  // return response.data.accessToken;
  return null; // Placeholder, replace with actual implementation
}

export default axiosInstance;
