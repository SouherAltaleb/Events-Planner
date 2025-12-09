import { useContext } from "react";
import { useState } from "react";

import { EventContext } from "../context/UseEventContext";

const EventForm = () => {
  const { addEvent } = useContext(EventContext);

  // state für eingabefelder
  const [formData, setFormData] = useState({
    title: "",
    desription: "",
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
    addEvent(formData);
  };

  return (
    <div className="flex min-h-screen w-full justify-between bg-(--color-light-beige-50) px-16 py-20">
      {/* <h2 className="event-title">Event Form</h2>
      <button className="btn" onClick={addEvent}>
        add event
      </button> */}

      {/* LEFT SIDE TEXT */}
      <div className="w1/3">
        <h1 className="mb-4 text-5xl font-bold">LOS GEHTS</h1>
        <h1 className="max-w-96 text-3xl">YOUR NEXT BIG MOMENT STARTS NOW.</h1>
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
          className="input input-border rounded-full bg-white"
        />
        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.desription}
          onChange={handleChange}
          className="textarea textarea-border h-32 rounded-2xl bg-white"
        ></textarea>
        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-border rounded-full bg-white"
        />
        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered rounded-full bg-white"
        />
        {/* Latitude */}
        <input
          type="text"
          name="latitude"
          placeholder="latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="input input-bordered rounded-full bg-white"
        />
        {/* Longitude */}
        <input
          type="text"
          name="longitude"
          placeholder="longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="input input-bordered rounded-full bg-white"
        />
        {/* Button */}
        <button type="submit" className="btn mt-2 rounded-full text-white">
          {" "}
          ADD NEW EVENT
        </button>
      </form>
    </div>
  );
};

export default EventForm;
