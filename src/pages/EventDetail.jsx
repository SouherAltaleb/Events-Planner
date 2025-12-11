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
    <div className="eventDetail-container">
      <figure className="eventDetai-img-holder">
        <img className="eventDetail-img" src="/celebrate.png" alt="celebrate" />
      </figure>
      <div className="event-content">
        <h2 className="event-title">Detail for: {event.title}</h2>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
