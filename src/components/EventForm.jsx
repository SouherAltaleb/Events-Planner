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

  return (
    <div className="flex min-h-screen w-full justify-between bg-(--color-light-beige) px-16 py-20">
      {/* <h2 className="event-title">Event Form</h2>
      <button className="btn" onClick={addEvent}>
        add event
      </button> */}

      {/* LEFT SIDE TEXT */}
      <div className="w1/3">
        <h1 className="mb-4 text-5xl font-bold">LOS GEHTS</h1>
      </div>
    </div>
  );
};

export default EventForm;
