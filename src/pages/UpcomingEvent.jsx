// import Slider from "../components/Slider";
// const UpcomingEvent = () => {
//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center p-10">
//         <Slider />
//       </div>
//     </div>
//   );
// };
// export default UpcomingEvent;
import { useContext } from "react";

import Slider from "../components/Slider";
import { EventContext } from "../context/UseEventContext";

const UpcomingEvent = () => {
  const { events } = useContext(EventContext);

  const upcoming = events?.filter((e) => new Date(e.date) > new Date()) || [];

  const hasNoEvents = upcoming.length === 0;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-10">
      {hasNoEvents ? (
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          {/* Icon */}
          <img src="logo.svg"></img>

          {/* Message */}
          <h2 className="text-xl font-semibold">
            There are currently no events
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please check back later. New events will be added soon.
          </p>
        </div>
      ) : (
        <Slider />
      )}
    </div>
  );
};
export default UpcomingEvent;
