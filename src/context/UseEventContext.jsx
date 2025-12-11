import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  getEventsFromDB,
  getGeoLocation,
  getUpcomingEvents,
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
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState(null);

  const translateError = (msg) => {
    if (msg.startsWith("User Already Exist")) {
      return "This user already exists.";
    }
    if (msg.startsWith("Forbidden. Invalid email or password")) {
      return "Forbidden. Invalid email or password.";
    }
    if (msg.includes('"name" length must be at least 2')) {
      return "The name must be at least 2 characters long.";
    }
    if (msg.includes('"title" length must be at least 3')) {
      return "The title must be at least 3 characters long.";
    }
    if (msg.includes("must be a maximum of 5000 characters")) {
      return "The title must be at least 3 characters long.";
    }
    return "An  error has occurred.";
  };

  const [upcomingEvents, setUpcomingEvents] = useState(null);
  // User registrieren
  const signUpUser = (e) => {
    const newUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    signUpUserToDB(newUser)
      .then((signUpData) => {
        if (signUpData.error) {
          const error = signUpData.message;
          setError(translateError(error));
        } else {
          const user = { ...signUpData.data, isActive: false };
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(user);
          navigate("/signin");
        }
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
        if (signInData.error) {
          const error = signInData.message;
          setError(translateError(error));
        } else {
          if (signInData.data.token) {
            const user = { ...signInData.data.user, isActive: true };
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem(
              "token",
              JSON.stringify(signInData.data.token),
            );
            setUser(user);
            navigate("/");
          }
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
        if (response.ok) {
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
        if (updateUserData.error) {
          const error = updateUserData.message;
          setError(translateError(error));
        } else {
          const user = { ...updateUserData.data, isActive: true };
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadEvents = async () => {
    try {
      const eventsFromAPI = await getEventsFromDB();
      setEvents(eventsFromAPI.results);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadUpcomingEvents = async () => {
    try {
      const upcomingEventsFromAPI = await getUpcomingEvents();
      console.log("Upcoming Events loaded in API:", upcomingEventsFromAPI);
      setUpcomingEvents(upcomingEventsFromAPI);
      console.log("Upcoming Events loaded in Context:", upcomingEvents);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    loadUpcomingEvents();
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
            if (eventData.error) {
              const error = eventData.message;
              setError(translateError(error));
            } else {
              const newEvents = [...events, eventData.data];
              const sortedByDateEvents = newEvents.sort(
                (a, b) => new Date(b.date) - new Date(a.date),
              );
              setEvents(sortedByDateEvents);
              navigate("/");
            }
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
        error,
        setError,
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
        upcomingEvents,
        setUpcomingEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
