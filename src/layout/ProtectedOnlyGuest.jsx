import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { EventContext } from "../context/UseEventContext.jsx";

const ProtectedOnlyGuest = () => {
  const { user } = useContext(EventContext);
  return user === null || (user && user.isActive === false) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedOnlyGuest;
