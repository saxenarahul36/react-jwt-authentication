import { useEffect, useState, useCallback } from "react";
import api from "../services/axios/index";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchRequest = useCallback(async () => {
    try {
      const response = await api.get(url);
      if (response) {
        setData(response);
      } else {
        throw response;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchRequest();
  }, [url, fetchRequest]);

  return { data, error, loading, fetchRequest };
};

export default useFetch;
