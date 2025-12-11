import { useContext, useState } from "react";

import { EventContext } from "../context/UseEventContext";

const SignIn = () => {
  const { signInUser } = useContext(EventContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validFields, setValidFields] = useState({
    email: true,
    password: true,
  });

  const validateField = (name, value) => {
    switch (name) {
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
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setValidFields(updatedValidity);
    const isFormValid = Object.values(updatedValidity).every(Boolean);
    if (isFormValid) {
      signInUser(e);
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
    <div className="mx-auto my-5 flex w-[96%] max-w-[1086px] flex-col items-center justify-between gap-4 rounded-2xl bg-white px-4 md:flex-row md:px-16">
      <div className="full-w flex items-center justify-center md:w-1/2">
        <img
          src="celebrate.svg"
          width="100%"
          height="auto"
          alt="Sign in"
          className="block"
        />
      </div>
      <div className="full-w md:w-1/2">
        <h1 className="mb-5 text-2xl uppercase">Sign in</h1>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="full-w flex flex-col gap-4"
        >
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
            className="btn mt-2 mb-4 w-full rounded-full border-0 bg-(--color-primary) text-white shadow-md hover:bg-(--color-secondary) md:mb-0"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
