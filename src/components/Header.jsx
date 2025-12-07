import { useContext } from "react";
import { Link } from "react-router-dom";

import { EventContext } from "../context/useEventContext.jsx";

const Header = () => {
  const { user, logoutUser, deleteUser } = useContext(EventContext);
  return (
    <div>
      <h2>Header</h2>
      {user && user.isActive ? (
        <div>Hello {user?.email || "user"}!</div>
      ) : (
        <div>Not logged in</div>
      )}
      <nav>
        <Link to="/">Home |</Link>
        <Link to="/signin">Sign In |</Link>
        <Link to="/signup">Sign Up |</Link>
        <Link to="/addEvent">Add Event |</Link>
        {user && user.isActive && (
          <>
            <button
              className="cursor-pointer"
              type="button"
              onClick={logoutUser}
            >
              Logout |
            </button>
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => deleteUser(user.id)}
            >
              Delete account |
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
