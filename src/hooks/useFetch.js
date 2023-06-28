import { useState, useEffect } from "react";
import axios from "../api/axios";

const useFetch = (dataRoute) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async (dataRoute) => {
      setIsLoading(true);

      try {
        const response = await axios.get(dataRoute, {
          signal: abortController.signal,
        });

        setData(response.data);
        setFetchError(null);
      } catch (error) {
        if (!abortController.signal.aborted) {
          //!!
          console.log(error);
          setFetchError("Something went wrong");
          setData([]);
        }
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    };

    fetchData(dataRoute);

    return () => {
      abortController.abort();
    };
  }, [dataRoute]);

  return { data, fetchError, isLoading };
};

export default useFetch;
