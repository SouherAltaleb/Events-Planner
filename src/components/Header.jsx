import { useContext } from "react";
import { Link } from "react-router-dom";

import { EventContext } from "../context/UseEventContext.jsx";

const Header = () => {
  const { user, logoutUser } = useContext(EventContext);
  return (
    <div>
      <nav className="flex h-10 w-full border-b">
        {user && user.isActive === true ? (
          <div>Hello {user?.email}!</div>
        ) : (
          <div>Not logged in</div>
        )}
        <Link to="/">Home |</Link>
        <Link to="/signin">Sign In |</Link>
        <Link to="/signup">Sign Up |</Link>
        <Link to="/addEvent">Add Event |</Link>
        {user && user.isActive === true && (
          <>
            <button
              className="cursor-pointer"
              type="button"
              onClick={logoutUser}
            >
              Logout |
            </button>
            <Link to="/updateUser">User account |</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
