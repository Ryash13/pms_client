import { useState } from "react";
import { AxiosError } from "axios";
import api from "./axiosConfig";

interface ApiResponse<T> {
  data: T;
}

const useApi = <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any | null = null
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api<ApiResponse<T>>({
        method,
        url: endpoint,
        data,
      });
      setResponse(result.data.data);
    } catch (error) {
      console.log(error)
      const axiosError = error as AxiosError;
      setError((axiosError.response?.data as { error: string })?.error || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, triggerApi };
};

export default useApi;
