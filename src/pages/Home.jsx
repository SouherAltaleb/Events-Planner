import { Link } from "react-router";

import EventList from "../components/EventList";
import EventDetail from "./EventDetail";

const Home = () => {
  return (
    <div className="event-card">
      <h2 className="event-title"> here is our Home Page</h2>
      {<EventList />}
      <Link to="/eventDetail">{<EventDetail />}</Link>
    </div>
  );
};

export default Home;
