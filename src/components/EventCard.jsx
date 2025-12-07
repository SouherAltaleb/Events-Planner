import { Link } from "react-router";

const EventCard = ({ event }) => {
  const { id } = event;
  return (
    <div className="event-card">
      <h2 className="event-title">Event Card</h2>
      <Link to={`/event/${id}`}>To the details of the event</Link>
    </div>
  );
};

export default EventCard;
