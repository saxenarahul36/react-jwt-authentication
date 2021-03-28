import { useState } from "react";
import useLoading from "./useLoading";

const useAsync = (loadingOnStartup = false, defaultData = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading(loadingOnStartup);
  const fetcher = (asyncFunc) => {
    startLoading();
    asyncFunc().then(setData).catch(setError).then(stopLoading);
  };

  return {
    data,
    error,
    fetcher,
    loading,
  };
};

export default useAsync;
