import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import axios from 'axios';

const AttendanceMarkingPopup = ({ setIsOpen, selectedDate, studentId, onSave }) => {
  const [attendanceType, setAttendanceType] = useState(null);
  const [leaveType, setLeaveType] = useState(null);

  const handleSave = async () => {
    // Define status based on attendanceType and leaveType
    let status = "Absent";
    if (attendanceType === "present") {
      status = "Present";
    } else if (attendanceType === "leave") {
      status = leaveType === "half" ? "Half-day" : "Absent";
    }

    try {
      // Save data to backend
      await axios.post('http://localhost:3000/attendance/mark', {
        studentId,
        date: selectedDate,
        status,
      });
      // Call onSave callback to update parent component state
      onSave({ studentId, date: selectedDate, status });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-2xl font-semibold text-center text-purple-900 mb-4">
          Mark Attendance
        </h2>
        <p className="text-gray-600 text-center mb-4">Selected Date: {selectedDate}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={() => setAttendanceType("present")} 
                  className={`py-2 px-4 rounded-md ${attendanceType === "present" ? "bg-gray-200" : "bg-gray-100"}`}>
            Present
          </button>
          <button onClick={() => setAttendanceType("leave")} 
                  className={`py-2 px-4 rounded-md ${attendanceType === "leave" ? "bg-red-800 text-white" : "bg-red-700 text-white"}`}>
            Leave
          </button>
        </div>

        {attendanceType === "leave" && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={() => setLeaveType("half")} 
                    className={`py-2 px-4 rounded-md ${leaveType === "half" ? "bg-gray-200" : "bg-gray-100"}`}>
              Half Day
            </button>
            <button onClick={() => setLeaveType("full")} 
                    className={`py-2 px-4 rounded-md ${leaveType === "full" ? "bg-red-800 text-white" : "bg-red-700 text-white"}`}>
              Full Day
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setIsOpen(false)} 
                  className="py-2 px-4 bg-red-700 text-white rounded-md">Exit</button>
          <button onClick={handleSave} 
                  className="py-2 px-4 bg-green-700 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMarkingPopup;
