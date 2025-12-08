import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { EventContext } from "../context/UseEventContext";

const EventList = () => {
  const { events, loadEvents } = useContext(EventContext); //if (!events) return <div>Loading...</div>;

  // Hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    if (!events) {
      loadEvents();
    }
  }, [events]);

  if (!events) {
    return <p>Loading…</p>;
  }

  if (events.results.length === 0) {
    return (
      <div>No events were found because the API is not currently working.</div>
    );
  }

  return (
    <div className="event-card">
      <h2 className="event-title">Event List</h2>

      <ul className="my-10">
        {events.results.map((event) => (
          // <EventCard event={event} key={event.id} />
          <li key={event.id}>
            {event.title}
            <button
              className="m-3 bg-[#6D2E46] font-(--font-body)"
              onClick={() =>
                navigate(`/events/${encodeURIComponent(event.title)}`)
              }
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
