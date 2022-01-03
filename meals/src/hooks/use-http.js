import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (url, config, handleData) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: config?.method || "GET",
        body: JSON.stringify(config?.body) || null,
        headers: config?.headers || {},
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      return handleData(data);
    } catch (err) {
      setError(error.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest }
};

export default useHttp;
