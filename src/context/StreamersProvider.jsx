import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import * as Realm from "realm-web";

const StreamersContext = createContext({});

const app = new Realm.App({ id: "streamers-mongo-app-umdwq" });

export const StreamersProvider = ({ children }) => {
  const { data, fetchError, isLoading } = useFetch("/streamers");

  const [streamers, setStreamers] = useState([]);
  const [user, setUser] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setStreamers(data);
  }, [data]);

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
      console.log(user);
      console.log("Connected");

      // Connect to the database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("streamers");

      // Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

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
