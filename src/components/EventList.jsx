import { useContext } from "react";

import { EventContext } from "../context/UseEventContext";

const EventList = () => {
  const { events } = useContext(EventContext); //if (!events) return <div>Loading...</div>;

  if (!events || !events.results) {
    return <div>Loading...</div>;
  }

  if (events.results.length === 0) {
    return (
      <div>No events were found because the API is not currently working.</div>
    );
  }

  return (
    <div className="event-card">
      <h2 className="event-title">Event List</h2>

      <ul>
        {events.results.map((event) => (
          // <EventCard event={event} key={event.id} />
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
