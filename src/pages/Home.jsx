// import { Link } from "react-router";
import { useNavigate } from "react-router";

import EventList from "../components/EventList";

const Home = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-main relative h-full">
        <img
          src="hero-bild-2.png"
          alt="Hero"
          className="hero-img w-full object-cover md:h-screen"
        />
        {/* Content overlay on image */}
        <div className="hero-main-content /* smaller padding for mobile */ /* desktop padding */ absolute inset-0 flex flex-col items-start justify-start gap-4 p-6 text-white md:p-20">
          <h1 className="hero-main-title /* mobile size */ /* desktop size */ text-4xl leading-tight md:text-6xl">
            Events <br />
            <span className="text-5xl md:text-[4rem]">Made Simple</span>
          </h1>

          <p className="hero-main-text /* mobile */ /* desktop */ text-base md:text-xl">
            Create experiences without limits <br />
            Flexible, intuitive, and anytime
          </p>

          <button
            onClick={() => navigate(`/signup`)}
            className="hero-main-btn px-4 py-2 text-sm md:px-6 md:py-3 md:text-base"
          >
            GET STARTED
          </button>
        </div>
      </div>

      <EventList />
    </div>
  );
};

export default Home;
