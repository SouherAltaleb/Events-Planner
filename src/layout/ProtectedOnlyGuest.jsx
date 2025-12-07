import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { EventContext } from "../context/useEventContext.jsx";

const ProtectedOnlyGuest = () => {
  const { user } = useContext(EventContext);
  return user == null ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedOnlyGuest;
