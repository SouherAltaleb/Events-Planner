import { useContext, useEffect, useState } from "react";

import { EventContext } from "../context/UseEventContext";

const EventForm = () => {
  const { error, setError, addEvent } = useContext(EventContext);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  // state für eingabefelder
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    /*latitude: "",
    longitude: "",*/
  });

  const [validFields, setValidFields] = useState({
    title: true,
    description: true,
    date: true,
    location: true,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return value.trim().length > 0;
      case "description":
        return value.trim().length > 0;
      case "date":
        return value.trim().length > 0;
      case "location":
        return value.trim().length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedValidity = {
      title: validateField("title", formData.title),
      description: validateField("description", formData.description),
      date: validateField("date", formData.date),
      location: validateField("location", formData.location),
    };
    setValidFields(updatedValidity);
    const isFormValid = Object.values(updatedValidity).every(Boolean);
    if (isFormValid) {
      addEvent(e);
    }
    // const finalData = {
    //   ...formData,
    //   date: new Date(formData.date).toISOString(),
    //   latitude: parseFloat(formData.latitude),
    //   longitude: parseFloat(formData.longitude),
    // };
    // addEvent(finalData);
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
    <div className="right-0 m-0 p-0">
      <div className="flex min-h-screen w-full flex-col gap-12 px-16 py-20 md:flex-row md:justify-between md:px-12 lg:px-16 lg:py-20">
        {/* BACKGROUND IMAGES */}
        <img
          src="beige-form.svg"
          className="absolute top-20 right-0 z-0 w-40 opacity-50 md:w-56 md:opacity-100"
        />
        <img src="rosa-form.svg" className="absolute bottom-20 left-0 z-0" />

        {/* LEFT SIDE TEXT */}
        <div className="relative z-10 w-full text-center md:w-1/3 md:text-left">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            LOS GEHTS
          </h1>
          <h2 className="text-2xl leading-tight md:max-w-sm md:text-3xl lg:text-4xl">
            YOUR NEXT BIG MOMENT STARTS NOW.
          </h2>
        </div>

        {/* FORM AREA */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex w-full flex-col gap-4 md:w-1/2"
        >
          {/* Title */}
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={`input input-bordered w-full rounded-full bg-white shadow-md ${!validFields.title ? "error" : ""}`}
          />

          {/* Description */}
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={`textarea textarea-bordered h-32 w-full rounded-2xl bg-white shadow-md ${!validFields.description ? "error" : ""}`}
          />

          {/* Date */}
          <label htmlFor="date" className="sr-only">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`input input-bordered w-full rounded-full bg-white shadow-md ${!validFields.date ? "error" : ""}`}
          />

          {/* Location */}
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={`input input-bordered w-full rounded-full bg-white shadow-md ${!validFields.location ? "error" : ""}`}
          />

          {/* Latitude */}
          {/*<label htmlFor="latitude" className="sr-only">
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full bg-white shadow-md"
          />*/}

          {/* Longitude */}
          {/*<label htmlFor="longitude" className="sr-only">
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full bg-white shadow-md"
          />*/}

          {/* Button */}
          <button
            type="submit"
            className="btn mt-2 w-full rounded-full border-0 bg-(--color-primary) text-white shadow-md hover:bg-(--color-secondary)"
          >
            ADD NEW EVENT
          </button>

          {/* {error} */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-red-100 p-4 text-(--color-alert) shadow-md">
              {/* Icon */}
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              {/* Error Text */}
              <span className="text-sm font-medium">{error}</span>

              {/* Close Button */}
              <button
                onClick={() => setError(null)}
                className="ml-auto text-(--color-alert) hover:text-(--color-alert)"
              >
                ✕
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventForm;
