import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { sortStreamers } from "../utils/sortStreamers";
import * as Realm from "realm-web";

const StreamersContext = createContext({});

const app = new Realm.App({ id: import.meta.env.VITE_MONGO_APP_ID });

export const StreamersProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useFetch("/streamers");
  const [streamers, setStreamers] = useState([]);

  useEffect(() => {
    setStreamers(data);
  }, [data]);

  useEffect(() => {
    const login = async () => {
      await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb
        .db(import.meta.env.VITE_MONGO_APP_DB)
        .collection(import.meta.env.VITE_MONGO_APP_COLLECTION);

      for await (const change of collection.watch()) {
        switch (change.operationType) {
          case "update": {
            const updatedStreamerId = change?.fullDocument?._id.toString();

            setStreamers((prev) => {
              const filteredStreamers = prev.filter(
                (streamer) => streamer._id !== updatedStreamerId
              );
              return sortStreamers([
                ...filteredStreamers,
                { ...change?.fullDocument, _id: updatedStreamerId },
              ]);
            });
            break;
          }

          case "insert": {
            console.log(change);
            const newStreamerId = change?.fullDocument?._id.toString();
            const newStreamer = { ...change?.fullDocument, _id: newStreamerId };
            setStreamers((prev) => sortStreamers([...prev, newStreamer]));
            break;
          }
        }
      }
    };

    try {
      login();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <StreamersContext.Provider value={{ streamers, fetchError, isLoading }}>
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
