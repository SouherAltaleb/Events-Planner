import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import ProtectedOnlyAuth from "./layout/ProtectedOnlyAuth.jsx";
import ProtectedOnlyGuest from "./layout/ProtectedOnlyGuest.jsx";
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
          <Route index element={<Home />} />
          <Route path="/signin" element={<ProtectedOnlyGuest />}>
            <Route index element={<SignIn />} />
          </Route>
          <Route path="/signup" element={<ProtectedOnlyGuest />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="addEvent" element={<ProtectedOnlyAuth />}>
            <Route index element={<AddEvent />} />
          </Route>
          <Route path="event/:slug" element={<EventDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
