import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { EventContext } from "../context/useEventContext.jsx";

const ProtectedOnlyAuth = () => {
  const { user } = useContext(EventContext);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedOnlyAuth;
