import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { EventContext } from "../context/UseEventContext";

const MainLayout = () => {
  const { user, events, addEvent, signUpUser, signInUser } =
    useContext(EventContext);
  return (
    <div>
      <Header />
      <Outlet
        context={{
          user,
          events,
          addEvent,
          signUpUser,
          signInUser,
        }}
      />
      <Footer />
    </div>
  );
};

export default MainLayout;
