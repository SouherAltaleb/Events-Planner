import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import ProtectedOnlyAuth from "./layout/ProtectedOnlyAuth.jsx";
import ProtectedOnlyGuest from "./layout/ProtectedOnlyGuest.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

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
