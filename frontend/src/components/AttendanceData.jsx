import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import AddPopup from "./AddPopup";
import AttendanceMarkingPopup from "./AttendanceMarkingPopup";
import { useEffect } from "react";

export default function AttendanceData() {
  const [currentMonth, setCurrentMonth] = useState("October 2023");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = 15; // for simplicity, only 15 days are shown here

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/students/students-data");
        setStudents(response.data); // Assume response.data is an array
      } catch (error) {
        setError("Failed to fetch students. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, []);


  // Handle cell click to open the attendance marking popup
  const handleCellClick = (studentId, date) => {
    setSelectedStudentId(studentId);
    setSelectedDate(date);
    setIsOpen(true);
  };

  // Update attendance data upon saving from the popup
  const handleSaveAttendance = async ({ studentId, date, status }) => {
    // Optimistically update the state
    const optimisticData = {
      ...attendanceData,
      [studentId]: {
        ...attendanceData[studentId],
        [date]: status,
      },
    };
    setAttendanceData(optimisticData);
  
    // Save to backend
    try {
      await axios.post('http://localhost:3000/attendance/mark', {
        studentId,
        date,
        status,
      });
    } catch (error) {
      // Revert back the optimistic update if failed
      setAttendanceData((prevData) => ({
        ...prevData,
        [studentId]: {
          ...prevData[studentId],
          [date]: "not-updated", // or whatever the original state was
        },
      }));
      alert("Failed to save attendance. Please try again.");
    }
  };
  

  // Handle adding a new student and setting default attendance to "not-updated"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || rollNumber.trim() === '') {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      name: name,
      rollNumber: rollNumber,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/students/add", newStudent);
      console.log(response.data,'0000')

      const studentId = response.data.id;
      const initialAttendance = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `2023-10-${String(day).padStart(2, '0')}`;
        initialAttendance[date] = "not-updated";
      }

      setAttendanceData((prevData) => ({
        ...prevData,
        [studentId]: initialAttendance,
      }));

     
      setName('');
      setRollNumber('');
      setIsOpenAdd(false);
    } catch (error) {
      setError("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-semibold">{currentMonth}</h2>
          <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FaCheckCircle />
            <span>Full Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-yellow-500">
              <div className="w-4 h-2 bg-yellow-500 rounded-t-full" />
            </div>
            <span>Half day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
              <div className="w-2 h-2 rotate-45 bg-red-500" />
            </div>
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
            <span>Not Updated</span>
          </div>
        </div>
        <div>
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Roll No</th>
                <th className="border px-4 py-2">Name</th>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th key={i} className="border px-2 text-xs py-2 text-center">
                    {`${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border px-2 py-2">{student.rollNumber}</td>
                  <td className="border px-2 py-2">{student.name}</td>
                  {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                    const date = `2023-10-${String(dayIndex + 1).padStart(2, '0')}`;
                    const status = attendanceData[student.id]?.[date] || "not-updated";

                    return (
                      <td
                        key={dayIndex}
                        onClick={() => handleCellClick(student.id, date)}
                        className="border cursor-pointer px-4 py-2 text-center"
                      >
                        {status === "Present" && <div className="w-4 h-4 bg-green-500 rounded-full" />}
                        {status === "Half-day" && <div className="w-4 h-4 bg-yellow-500 rounded-full" />}
                        {status === "Absent" && <div className="w-4 h-4 bg-red-500 rounded-full" />}
                        {status === "not-updated" && <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setIsOpenAdd(true)} className="bg-blue-400 px-6 py-1 rounded-lg mt-4">Add</button>
          {isOpen && (
            <AttendanceMarkingPopup
              setIsOpen={setIsOpen}
              selectedDate={selectedDate}
              studentId={selectedStudentId}
              onSave={handleSaveAttendance}
            />
          )}
          {isOpenAdd && (
            <AddPopup
              handleSubmit={handleSubmit}
              error={error}
              loading={loading}
              setIsOpen={setIsOpenAdd}
              name={name}
              setName={setName}
              rollNumber={rollNumber}
              setRollNumber={setRollNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}
