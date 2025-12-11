import EventList from "../components/EventList";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-main relative h-full">
        <img
          src="/hero-bild-2.png"
          alt="Hero"
          className="hero-img w-full object-cover md:h-screen"
        />
        {/* Content overlay on image */}
        <div className="hero-main-content absolute inset-0 flex flex-col content-start items-start justify-start gap-5 p-20 text-white">
          <h1 className="hero-main-title">
            Events <br />{" "}
            <span className="md: text-3xl text-[4rem]">Made Simple</span>
          </h1>
          <p className="hero-main-text">
            Gestalte Erlebnisse ohne Grenzen <br /> flexibel, intuitiv und
            jederzeit.
          </p>
          <button className="hero-main-btn">Get Started</button>
        </div>
      </div>

      <EventList />
    </div>
  );
};

export default Home;
