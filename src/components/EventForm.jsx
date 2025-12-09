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
    console.log("hello");

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
    <div className="flex min-h-screen w-full justify-between bg-(--color-light-beige-50) px-16 py-20">
      {/* LEFT SIDE TEXT */}
      <div className="w-1/3">
        <h1 className="mb-4 text-6xl font-bold">LOS GEHTS</h1>
        <h1 className="max-w-96 text-4xl leading-12">
          YOUR NEXT BIG MOMENT STARTS NOW.
        </h1>
      </div>
      {/* FORM AREA */}
      <form onSubmit={handleSubmit} className="flex w-1/2 flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-border shadow-2xm w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
        />
        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-border h-32 w-full rounded-2xl border-(--color-primary) bg-white shadow-md hover:border-2"
        ></textarea>
        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-border w-full rounded-full border-(--color-primary) bg-white shadow-md hover:border-2"
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
  );
};

export default EventForm;
