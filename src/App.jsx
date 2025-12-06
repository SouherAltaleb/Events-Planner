// import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import EventList from "./components/EventList";
import MainLayout from "./layout/MainLayout";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="addEvent" element={<AddEvent />} />
          <Route path="/eventDetail" element={<EventDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
