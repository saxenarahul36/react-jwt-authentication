import { useState } from "react";

const useLoading = (loadingOnStart = false) => {
  const [loading, setloading] = useState(loadingOnStart);
  const startLoading = () => {
    setloading(true);
  };

  const reset = () => {
    setloading(loadingOnStart);
  };

  const stopLoading = () => {
    setloading(false);
  };

  return { loading, startLoading, stopLoading, reset };
};

export default useLoading;
