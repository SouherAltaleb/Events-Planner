import { useContext } from "react";
import { useEffect } from "react";

import { EventContext } from "../context/UseEventContext";
import EventCard from "./EventCard";

const EventList = () => {
  const { events, loadEvents } = useContext(EventContext); //if (!events) return <div>Loading...</div>;

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
    <div className="m-10">
      <h2 className="mb-5 text-xl font-semibold text-(--color-primary)">
        {" "}
        OUR EVENTS
      </h2>

      <div className="my-10 grid grid-cols-1 content-center gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.results.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
