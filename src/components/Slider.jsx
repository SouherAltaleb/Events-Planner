import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router";
// import { Link } from "react-router";
import { useNavigate } from "react-router";

import { EventContext } from "../context/UseEventContext";
import EventCard from "./EventCard";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const { upcomingEvents } = useContext(EventContext);
  const eventsList = upcomingEvents || [];

  // State to track mobile vs desktop
  const [mobile, setMobile] = useState(window.innerWidth <= 767);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Update on window resize
  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop helper functions
  const centerCard = (index) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[index];
    if (!card) return;

    const axis = "left";
    const size = "clientWidth";
    const start = card.offsetLeft;

    trackRef.current.parentElement.scrollTo({
      [axis]: start - (trackRef.current[size] / 2 - card[size] / 2),
      behavior: "smooth",
    });
  };

  const activateCard = (index) => {
    if (index === current) return;
    setCurrent(index);
  };

  const go = (step) => {
    const length = eventsList.length;
    const newIndex = Math.min(Math.max(current + step, 0), length - 1);
    activateCard(newIndex);
  };

  // Desktop: keyboard navigation
  useEffect(() => {
    if (mobile) return;
    const handleKey = (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, eventsList, mobile]);

  // Desktop: touch navigation
  useEffect(() => {
    if (mobile) return;
    let sx = 0;
    let sy = 0;
    const track = trackRef.current;

    const handleTouchStart = (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1);
    };

    track?.addEventListener("touchstart", handleTouchStart, { passive: true });
    track?.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      track?.removeEventListener("touchstart", handleTouchStart);
      track?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current, eventsList, mobile]);

  // Desktop: center active card
  useEffect(() => {
    if (!mobile) {
      const raf = requestAnimationFrame(() => centerCard(current));
      return () => cancelAnimationFrame(raf);
    }
  }, [current, eventsList, mobile]);

  if (!upcomingEvents) return <div>Loading...</div>;

  // Mobile version: simple vertical list
  if (mobile) {
    return (
      <section className="m-5">
        <h1 className="mb-5 text-2xl font-bold text-white">Upcoming Events</h1>
        <div className="flex flex-col gap-5">
          {eventsList.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop version: original slider
  return (
    <section className="m-10">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-8 px-5">
        <h1 className="text-2xl font-normal text-white lg:text-4xl">
          Discover Upcoming Events
        </h1>
        <div className="flex gap-2">
          <button
            className="btn btn-sm mt-5 rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary)"
            onClick={() => go(-1)}
            disabled={current === 0}
          >
            ‹
          </button>
          <button
            className="btn btn-sm mt-5 flex rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary) disabled:opacity-30"
            onClick={() => go(1)}
            disabled={current === eventsList.length - 1}
          >
            ›
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl overflow-hidden">
        <div
          className="flex snap-x snap-mandatory gap-5 scroll-smooth"
          ref={trackRef}
        >
          {eventsList.map((event, i) => (
            <article
              key={event.id}
              className={`relative shrink-0 cursor-pointer rounded-xl transition-all duration-500 ease-in-out ${
                i === current
                  ? "basis-120 -translate-y-1 shadow-2xl"
                  : "basis-20"
              } h-64 snap-start md:h-104`}
              onMouseEnter={() =>
                window.matchMedia("(hover:hover)").matches && activateCard(i)
              }
              onClick={() => activateCard(i)}
            >
              <div className="bg-[--color-light-beige-50]" />
              <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-0 ${
                  i === current ? "flex-row gap-4 p-5" : "flex-col"
                }`}
              >
                <img
                  src="logo-img.svg"
                  alt={event.title}
                  className={`rounded-xl object-cover shadow-lg transition-all duration-500 ${
                    i === current ? "block h-64 w-32" : "hidden"
                  }`}
                />
                <div>
                  <h3
                    className={`font-bold text-[(--color-primary)] transition-all duration-500 ${
                      i === current
                        ? "writing-mode-horizontal text-3xl"
                        : "writing-mode-vertical-rl rotate-90 text-xl"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p
                    className={`mt-1 text-[(--color-primary)] ${
                      i === current ? "block" : "hidden"
                    }`}
                  >
                    {event.description}
                  </p>
                  <button
                    className={`btn btn-md mt-5 rounded-full border-none bg-(--color-primary) px-6 text-white hover:bg-(--color-secondary) ${
                      i === current ? "block" : "hidden"
                    }`}
                    onClick={() =>
                      navigate(`/events/${encodeURIComponent(event.title)}`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {eventsList.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 cursor-pointer rounded-full transition-transform ${
              i === current
                ? "scale-125 bg-(--color-primary)"
                : "bg-(--color-secondary)"
            }`}
            onClick={() => activateCard(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Slider;
