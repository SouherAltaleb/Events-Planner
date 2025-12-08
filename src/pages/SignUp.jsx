import { useContext } from "react";

import { EventContext } from "../context/UseEventContext";

const SignUp = () => {
  const { signUpUser } = useContext(EventContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(e);
  };

  return (
    <div className="event-card">
      <h2 className="event-title">here is Sign Up</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input id="email" name="email" type="email" className="input" />
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
        />
        <button type="submit" className="btn">
          Sign up user
        </button>
      </form>
    </div>
  );
};

export default SignUp;
