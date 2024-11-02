import React from "react";
import { useState } from "react";
import AttendanceData from "./components/AttendanceData";
import AttendanceReport from "./components/AttendanceReport";
import Nav from "./components/Nav";

const App = () => {
  const [clickHandle, setClickHandle] = useState("data");
  const buttonClasses = "p-2 mb-4 cursor-pointer transition-bg";
  return (
    <div className="flex flex-col lg:flex-row  h-screen">
      <div className="bg-slate-800 lg:w-64 w-full text-white px-6 pt-10 lg:h-full h-auto">
        <h6
          onClick={() => setClickHandle("data")}
          className={`${buttonClasses} ${
            clickHandle === "data" ? "bg-gray-700" : ""
          }`}
        >
          Attendance Data
        </h6>
        <h6
          onClick={() => setClickHandle("report")}
          className={`${buttonClasses} ${
            clickHandle === "report" ? "bg-gray-700" : ""
          }`}
        >
          Attendance Report
        </h6>
      </div>
      <div className="flex-1 lg:overflow-y-auto">
        <Nav clickHandle={clickHandle} />
        {clickHandle === "data" ? <AttendanceData /> : <AttendanceReport />}
      </div>
    </div>
  );
};

export default App;

// YZkY68FcluUHJAAt
// muhammednavas6287
