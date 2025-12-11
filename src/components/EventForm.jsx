import { useContext } from "react";
import { useState } from "react";

import { EventContext } from "../context/UseEventContext";

const EventForm = () => {
  const { addEvent } = useContext(EventContext);

  // state für eingabefelder
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  // buttons
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent(e);
    // alert("hi");
    // const finalData = {
    //   ...formData,
    //   date: new Date(formData.date).toISOString(),
    //   latitude: parseFloat(formData.latitude),
    //   longitude: parseFloat(formData.longitude),
    // };
    // addEvent(finalData);
  };

  return (
    <div className="right-0 m-0 p-0">
      <div className="flex min-h-screen w-full flex-col justify-between gap-12 px-16 py-20 md:flex-row md:justify-between md:px-12 lg:px-16 lg:py-20">
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
          <h2 className="max-w-xs text-2xl leading-tight md:max-w-sm md:text-3xl lg:text-4xl">
            YOUR NEXT BIG MOMENT STARTS NOW.
          </h2>
        </div>

        {/* FORM AREA */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex w-full flex-col gap-4 md:w-1/2"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-32 w-full rounded-2xl border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Latitude */}
          <input
            type="text"
            name="latitude"
            placeholder="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Longitude */}
          <input
            type="text"
            name="longitude"
            placeholder="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="input input-bordered w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
          />

          {/* Button */}
          <button
            type="submit"
            className="btn mt-2 w-full rounded-full border-0 bg-(--color-primary) text-white shadow-md hover:bg-(--color-secondary)"
          >
            ADD NEW EVENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
