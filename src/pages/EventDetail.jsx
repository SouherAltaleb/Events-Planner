// import { Link } from "react-router";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";
import { useOutletContext, useParams } from "react-router";

// Fix for missing default Leaflet marker icons
const defaultIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// You MUST put marker-icon.png and marker-shadow.png inside /public
// Or Leaflet will not show the markers

const EventDetail = () => {
  const { title } = useParams();
  const { events } = useOutletContext();
  // Hook to navigate programmatically
  const navigate = useNavigate();
  // If events are not loaded yet
  if (!events) return <div>Loading...</div>;

  // Find event by decoded title
  const event = events.results.find(
    (e) => e.title === decodeURIComponent(title),
  );

  // If event not found
  if (!event) return <div>No event found.</div>;
  // Format the event date into a readable style
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(event.date));

  return (
    <div className="eventDetail-container">
      {/* Image Section */}
      <figure className="eventDetai-img-holder">
        {/* Use absolute path for images in public folder */}
        <img className="eventDetail-img" src="/bg-hero.jpg" alt="celebrate" />
      </figure>

      {/* Content Section */}
      <div className="event-content">
        <h1 className="eventDetai-title"> {event.title}</h1>
        <p>{formattedDate}</p>

        <p>{event.description}</p>

        <p>{event.location}</p>

        {/* Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm mt-5 rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary)"
        >
          BACK
        </button>
        {/* Map Section */}
        <div className="map-wrapper">
          {/* MapContainer renders the map UI */}
          <MapContainer
            center={[event.latitude, event.longitude]} // Event coordinates
            zoom={15}
            scrollWheelZoom={false}
            className="map-container"
          >
            {/* TileLayer loads the actual map tiles */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker shows the event position */}
            <Marker
              position={[event.latitude, event.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                {event.title} <br /> {event.location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
