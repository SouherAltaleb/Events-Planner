import { useContext } from "react";

import { EventContext } from "../context/useEventContext";

const EventForm = () => {
  const { addEvent } = useContext(EventContext);
  return (
    <div className="event-card">
      <h2 className="event-title">Event Form</h2>
      <button className="btn" onClick={addEvent}>
        add event
      </button>
    </div>
  );
};

export default EventForm;
