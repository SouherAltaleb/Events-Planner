import { useOutletContext } from "react-router";

import EventCard from "../components/EventCard.jsx";

const EventList = () => {
  const { events } = useOutletContext();
  //if (!events) return <div>Loading...</div>;
  if (events && events.length > 0) {
    return (
      <div className="event-card">
        <h2 className="event-title">Event List</h2>
        <div>
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>No events were found because the API is not currently working.</div>
    );
  }
};

export default EventList;
