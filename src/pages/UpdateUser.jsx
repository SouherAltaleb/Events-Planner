import { useContext, useState } from "react";

import { EventContext } from "../context/useEventContext";

const UpdateUser = () => {
  const { user, updateUser } = useContext(EventContext);
  const [formData, setFormData] = useState({
    name: user.name ?? "",
    email: user.email ?? "",
    password: user.password ?? "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(e, user.id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/<[^>]*>/g, "");
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="event-card">
      <h2 className="event-title">here is Udpate User Form</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="name"
          className="input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Update user
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
