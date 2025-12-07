import { useOutletContext, useParams } from "react-router";

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useOutletContext();
  if (!events) return <div>Loading...</div>;
  const event = events.find((e) => e.id === id);
  console.log(event);
  return (
    <div className="event-card">
      <h2 className="event-title">you can see here the Detail of Event</h2>
    </div>
  );
};

export default EventDetail;
