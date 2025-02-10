import { useCallback, useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import api from "./axiosConfig";
import { ApiResponse } from "@/types";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const useApi = <T, R>(config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const makeApiCall = useCallback(
    async (
      url: string,
      method: Method,
      body?: R,
      queryParams?: Record<string, any>,
      urlParams?: Record<string, string>
    ) => {
      setLoading(true);
      setError(null);
      try {
        // Replace URL placeholders with dynamic parameters
        let finalUrl = url;
        if (urlParams) {
          Object.keys(urlParams).forEach((key) => {
            finalUrl = finalUrl.replace(`:${key}`, urlParams[key]);
          });
        }

        const response = await api.request<ApiResponse<T>>({
          url: finalUrl,
          method,
          data: body, // POST or PUT body (optional)
          params: queryParams, // Query params (e.g., ?page=2&limit=10)
          ...config, // Any additional config passed from the hook
        });
        console.log(response);
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { error: string })?.error ||
            "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  return { data, error, loading, makeApiCall };
};

export default useApi;
