import { useOutletContext, useParams } from "react-router";

const EventDetail = () => {
  const { title } = useParams();
  const { events } = useOutletContext();
  if (!events) return <div>Loading...</div>;
  const event = events.results.find(
    (e) => e.title === decodeURIComponent(title),
  );
  if (!event) return <div>No event found.</div>;

  return (
    <div className="event-card">
      <h2 className="event-title">Detail for: {event.title}</h2>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;
