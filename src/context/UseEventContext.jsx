import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  deleteUserFromDB,
  //getUserFromDB,
  //setEventToDB,
  signInUserToDB,
  signUpUserToDB,
  updateUserToDB,
} from "../api/api.js";
import { getEventsFromDB } from "../api/eventApi.js";

export const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  /*const token = localStorage.getItem("token");
  const storedToken = token ? JSON.parse(token) : null;*/

  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState(null);
  const signUpUser = (e) => {
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    signUpUserToDB(newUser)
      .then((signUpData) => {
        const user = { ...signUpData, isActive: true };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const signInUser = (e) => {
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    signInUserToDB(newUser)
      .then((signInData) => {
        if (signInData.token) {
          const user = { ...signInData.user, isActive: true };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(signInData.token));
          setUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const deleteUser = (id) => {
    deleteUserFromDB(id)
      .then((response) => {
        if (response.status === 204) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateUser = (e, id) => {
    const newUser = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      isActive: true,
    };
    updateUserToDB(newUser, id)
      .then((updateUserData) => {
        const user = { ...updateUserData };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadEvents = async () => {
    try {
      const eventsFromAPI = await getEventsFromDB();
      setEvents(eventsFromAPI);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = (e) => {
    //console.log(e.target);
    //console.log("add event");
    //setEventToDB();
    //setEvent();
  };

  return (
    <EventContext.Provider
      value={{
        user,
        setUser,
        event,
        setEvent,
        events,
        setEvents,
        addEvent,
        signUpUser,
        signInUser,
        logoutUser,
        deleteUser,
        updateUser,
        loadEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
