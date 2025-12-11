// import { Link } from "react-router";
import { useNavigate } from "react-router";

const EventCard = ({ event }) => {
  if (!event) return null;
  const { id = event._id, title, date, location } = event;
  // Hook to navigate programmatically
  const navigate = useNavigate();
  // Format the event date into a readable style
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(event.date));

  return (
    <div className="relative w-full max-w-100 rounded-3xl bg-white p-6 shadow-[10px_10px_0px_0px_var(--color-hell-rosa)]">
      {/* Titel */}
      <h2 className="text-xl font-semibold text-(--color-primary)">{title}</h2>

      {/* Datum */}
      <p className="mt-1 text-sm text-gray-500">{formattedDate}</p>

      {/* Ort */}
      <p className="text-sm text-gray-600">{location}</p>

      {/* Button */}
      <button
        onClick={() => navigate(`/events/${encodeURIComponent(event.title)}`)}
        className="btn btn-sm mt-5 rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary)"
      >
        DETAILS
      </button>

      <img
        src="logo-img.svg"
        alt=" decoration"
        className="absolute right-3 bottom-0 w-13"
      />
    </div>
  );
};

export default EventCard;
