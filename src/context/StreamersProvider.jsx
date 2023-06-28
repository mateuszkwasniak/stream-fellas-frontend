import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

const StreamersContext = createContext({});

export const StreamersProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useFetch("/streamers");

  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    setStreamers(data);
  }, [data]);

  return (
    <StreamersContext.Provider
      value={{ streamers, setStreamers, fetchError, isLoading }}
    >
      {children}
    </StreamersContext.Provider>
  );
};

StreamersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StreamersContext;
