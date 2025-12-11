import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  getEventsFromDB,
  getGeoLocation,
  setEventToDB,
} from "../api/eventApi.js";
import {
  deleteUserFromDB,
  //getUserFromDB,
  signInUserToDB,
  signUpUserToDB,
  updateUserToDB,
} from "../api/userAPI.js";

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

  // User registrieren
  const signUpUser = (e) => {
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    signUpUserToDB(newUser)
      .then((signUpData) => {
        const user = { ...signUpData, isActive: false };
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(user);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // User einloggen
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

  // User ausloggen
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // User löschen (mit Token)
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

  // User Daten updaten (mit Token)
  const updateUser = (e, id) => {
    const newUser = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      isActive: true,
    };
    updateUserToDB(newUser, id)
      .then((updateUserData) => {
        const user = { ...updateUserData, isActive: true };
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

  // Event speichern (mit Token)
  const addEvent = (e) => {
    const event = {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      date: e.target.elements.date.value,
      location: e.target.elements.location.value,
      /*latitude: e.target.elements.latitude.value,
      longitude: e.target.elements.longitude.value,*/
    };
    getGeoLocation(e.target.elements.location.value)
      .then((localData) => {
        const latitudeData = localData[0].lat;
        const longitudeData = localData[0].lon;
        const newEvent = {
          ...event,
          latitude: latitudeData,
          longitude: longitudeData,
        };
        setEventToDB(newEvent)
          .then((eventData) => {
            setEvent(eventData);
            // setEvents muss noch ergänzed
            // setEvents((prev) => [...prev, eventData]);
            navigate("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
