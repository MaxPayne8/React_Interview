import React, { useEffect, useState } from "react";

//***** start button starts timer from 0 , pause functionality and reset functionality ******

// const Timers = () => {
//   const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     let interval = null;

//     if (isActive) {
//       interval = setInterval(() => {
//         setTime((time) => time + 1);
//       }, 1000);
//     }
//     // else if (!isActive && time !== 0) {
//     //   clearInterval(interval);
//     // }

//     return () => clearInterval(interval);
//   }, [time, isActive]);

//   return (
//     <div>
//       Timers
//       <div className="flex justify-center gap-5">
//         <button
//           className="bg-green-500 text-slate-800 p-1 px-4 rounded-lg"
//           onClick={() => {
//             setIsActive(true);
//           }}
//         >
//           Start
//         </button>
//         <button
//           className="bg-blue-600 text-slate-800 p-1 px-4 rounded-lg"
//           onClick={() => {
//             setIsActive(false);
//           }}
//         >
//           Pause
//         </button>
//         <button
//           className="bg-red-600 text-slate-800 p-1 px-4 rounded-lg"
//           onClick={() => {
//             setIsActive(false);
//             setTime(0);
//           }}
//         >
//           Reset
//         </button>
//       </div>
//       <div className="text-xl text-center text-slate-950">{time}</div>
//     </div>
//   );
// };

//

//*****input field to give time in timer, start button starts timer from input time  to 0 ,
// pause functionality and reset functionality ******

// Detailed Flow:

// Initial State:
// Assume the timer is running, and an interval is set.

// On Clicking Pause:
// isActive is set to false.
// useEffect is triggered because isActive has changed.
// The cleanup function clears the interval, stopping the timer.

// Subsequent Effects:
// useEffect will not set a new interval unless isActive becomes true again and time is greater than 0.

const Timers = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState("");

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      // When we click on "Start" and the entered time is greater than 0,
      // this will start the interval to decrement the time every second.
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    // else if (!isActive && time > 0) {// not required------>
    //   // When we click "Pause", this will immediately clear the interval,
    //   // stopping the countdown, but preserving the remaining time.
    //   clearInterval(interval);
    // }

    // The cleanup function: This runs every time before `useEffect` runs again or when the component unmounts.
    // It ensures that the previous interval is cleared before a new one is set, preventing multiple intervals from running.
    return () => clearInterval(interval);
  }, [time, isActive]);

  return (
    <div className="bg-blue-600 min-h-screen pt-20">
      <h1 className="text-center text-xl">Timers</h1>
      <div className="flex justify-center m-5">
        <input
          className="border-2 border-black px-1"
          type="number" // Set input type to number for better user experience
          onChange={(e) => setInputTime(Number(e.target.value) || 0)} // Ensure it's a number
          value={inputTime}
          placeholder="Enter time in seconds"
        />
      </div>
      <div className="flex justify-center gap-5 m-8">
        <button
          className="bg-green-500 text-slate-800 p-1 px-4 rounded-lg"
          onClick={() => {
            setIsActive(true);
            inputTime !== "" && setTime(inputTime);
            setInputTime("");
          }}
        >
          Start
        </button>
        <button
          className="bg-blue-900 text-slate-800 p-1 px-4 rounded-lg"
          onClick={() => setIsActive(false)}
        >
          Pause
        </button>
        <button
          className="bg-red-600 text-slate-800 p-1 px-4 rounded-lg"
          onClick={() => {
            setIsActive(false);
            setTime(0);
          }}
        >
          Reset
        </button>
      </div>
      <div className="text-3xl text-center text-slate-950 m-10">{time}</div>
    </div>
  );
};

export default Timers;
