import EventList from "../components/EventList";

const Home = () => {
  return (
    <div className="event-card">
      <div className="hero-main">
        <div className="hero-main-content">
          <h1 className="hero-main-title">
            Events <br />
            <span className="text-6xl"> Made Simple</span>
          </h1>

          <p className="hero-main-text">
            Gestalte Erlebnisse ohne Grenzen flexibel, intuitiv und jederzeit.
          </p>
          <button className="hero-main-btn">Get Started</button>
        </div>
        <figure className="hero-img-holder">
          <img src="./bg-hero.jpg" className="hero-img"></img>
        </figure>
      </div>

      <EventList />
    </div>
  );
};

export default Home;
