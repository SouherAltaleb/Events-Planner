import EventCard from "../components/EventCard";
import EventList from "../components/EventList";

const Home = () => {
  return (
    <div className="event-card">
      <h2 className="event-title">here is our Home Page</h2>
      <EventList />
      <EventCard />
    </div>
  );
};

export default Home;
