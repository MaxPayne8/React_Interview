import React, { useEffect, useState } from "react";

const Practice = () => {
  const [time, setTime] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [span, setSpan] = useState(30 * 1000);
  console.log("span", span);
  console.log(time, "time");

  useEffect(() => {
    //
    let interval = null;
    if (isValid) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, span);
    }

    return () => clearInterval(interval);
  }, [span, isValid]);
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <div className="flex gap-5">
        <button
          className="bg-slate-950 text-slate-200"
          onClick={() => {
            setIsValid(true);
          }}
        >
          Start
        </button>
        <button
          className="bg-slate-950 text-slate-200"
          onClick={() => setSpan(span + 10 * 1000)}
        >
          Increase
        </button>
        <button
          className="bg-slate-950 text-slate-200" // 30*1000 , 20*1000 , 10*1000 ,
          onClick={() =>
            span === 10 * 1000 ? setSpan(10 * 1000) : setSpan(span - 10 * 1000)
          }
        >
          Decrease
        </button>
        <button
          className="bg-slate-950 text-slate-200"
          onClick={() => {
            setIsValid(false);
            setTime(0);
            setSpan(30 * 1000);
          }}
        >
          Reset
        </button>
      </div>
      <h1 className="text-6xl text-center">{time}</h1>
    </div>
  );
};

export default Practice;
