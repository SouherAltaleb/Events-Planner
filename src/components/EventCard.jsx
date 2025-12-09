import { Link } from "react-router";

const EventCard = ({ event }) => {
  if (!event) return null;
  const { id = event._id, title, date, location } = event;

  return (
    <div className="relative w-full max-w-xs rounded-3xl bg-white p-6 shadow-[10px_10px_0px_0px_var(--color-hell-rosa)]">
      {/* Titel */}
      <h2 className="text-xl font-semibold text-(--color-primary)">{title}</h2>

      {/* Datum */}
      <p className="mt-1 text-sm text-gray-500">{date}</p>

      {/* Ort */}
      <p className="text-sm text-gray-600">{location}</p>

      {/* Button */}
      <Link
        to={`/event/${id}`}
        className="btn btn-sm mt-5 rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary)"
      >
        DETAILS
      </Link>

      <img
        src="logo-img.svg"
        alt=" decoration"
        className="absolute right-3 bottom-0 w-13"
      />
    </div>
  );
};

export default EventCard;
