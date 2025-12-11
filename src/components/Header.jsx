import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { EventContext } from "../context/UseEventContext.jsx";

const Header = () => {
  const { user, logoutUser } = useContext(EventContext);
  const isLoggedIn = user && user.isActive === true;
  // mobile
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-8 py-4">
        {/* LEFT: Logo + Nav*/}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            {/* Logo */}
            <img src="logo.svg" alt="Logo" className="w-32 object-contain" />
          </Link>

          {/* nav */}
          <nav className="hidden items-center gap-6 font-semibold text-(--color-primary) md:flex">
            <Link to="/" className="uppercase hover:text-(--color-secondary)">
              Home
            </Link>
            <Link
              to="/upcoming"
              className="uppercase hover:text-(--color-secondary)"
            >
              Upcoming Event
            </Link>
            <Link
              to="/addEvent"
              className="uppercase hover:text-(--color-secondary)"
            >
              Add Event
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Desktop / Tablet */}
          <div className="hidden items-center gap-4 md:flex">
            {isLoggedIn ? (
              <>
                <Link to="/updateUser" className="flex items-center gap-2">
                  <img
                    src="user.svg"
                    alt="User Icon"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline">Hello, {user.email}</span>
                </Link>

                <button
                  onClick={logoutUser}
                  className="cursor-pointer rounded-full bg-(--color-primary) px-4 py-1 text-white uppercase hover:bg-(--color-secondary)"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="font-semibold text-(--color-primary) uppercase hover:text-(--color-secondary)"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-(--color-primary) px-4 py-1 text-white uppercase hover:bg-(--color-secondary)"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Burger button (rechts) */}
          {/* Burger button  */}
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer md:hidden"
          >
            <img
              src="burger-menu.svg"
              alt="Menu"
              className={`w-10 ${open ? "open" : ""}`}
              id="burger-icon"
            />
          </button>
        </div>
      </div>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 transition-opacity md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      />

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 transform bg-(--color-primary) p-6 shadow-lg transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="mb-6 cursor-pointer text-2xl text-white"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 text-lg font-semibold text-white uppercase">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/upcoming" onClick={() => setOpen(false)}>
            Upcoming Event
          </Link>
          <Link to="/addEvent" onClick={() => setOpen(false)}>
            Add Event
          </Link>

          <hr className="my-4" />

          {isLoggedIn ? (
            <>
              <Link
                to="/updateUser"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="user-white.svg"
                  alt="user"
                  className="h-8 w-8 rounded-full"
                />
                <span>Hello, {user.email.split("@")[0]}</span>
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                className="font-semibold uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setOpen(false)}>
                Sign In
              </Link>
              <Link
                to="/signup"
                className="mt-2 inline-block rounded-full bg-white px-4 py-1 text-(--color-primary)"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
