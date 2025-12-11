import { useContext, useEffect, useState } from "react";

import { EventContext } from "../context/UseEventContext";

const UpdateUser = () => {
  const { user, error, setError, updateUser, deleteUser } =
    useContext(EventContext);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validFields, setValidFields] = useState({
    name: true,
    email: true,
    password: true,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length > 0;
      case "email":
        return value.trim().length > 0;
      case "password":
        return value.trim().length >= 8;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedValidity = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setValidFields(updatedValidity);
    const isFormValid = Object.values(updatedValidity).every(Boolean);
    if (isFormValid) {
      updateUser(e, user.id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/<[^>]*>/g, "");
    setFormData({
      ...formData,
      [name]: newValue,
    });
    const isValid = validateField(name, newValue);
    setValidFields({
      ...validFields,
      [name]: isValid,
    });
  };

  return (
    <div className="mx-auto my-5 w-[96%] max-w-[1086px] rounded-2xl bg-white p-16">
      {error}
      <h1 className="mb-5 text-2xl uppercase">Update</h1>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="full-w mb-4 flex flex-col gap-4"
      >
        <label htmlFor="email" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={`input input-border shadow-2xm w-full rounded-full border-(--color-primary) bg-white shadow-md ${!validFields.email ? "error" : ""} hover:border-2`}
        />
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`input input-border shadow-2xm w-full rounded-full border-(--color-primary) bg-white shadow-md ${!validFields.email ? "error" : ""} hover:border-2`}
        />
        <label htmlFor="email" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`input input-border shadow-2xm w-full rounded-full border-(--color-primary) bg-white shadow-md ${!validFields.password ? "error" : ""} hover:border-2`}
        />
        <button
          type="submit"
          className="btn mt-2 w-full rounded-full border-0 bg-(--color-primary) text-white shadow-md hover:bg-(--color-secondary)"
        >
          Update
        </button>
      </form>
      <button
        type="button"
        onClick={() => deleteUser(user.id)}
        className="btn mt-2 w-full rounded-full border-0 bg-(--color-primary) text-white shadow-md hover:bg-(--color-secondary)"
      >
        Delete account
      </button>
    </div>
  );
};

export default UpdateUser;
