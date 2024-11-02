import { useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"

export default function AttendanceReport() {
  const [fromDate, setFromDate] = useState("12/10/2022")
  const [toDate, setToDate] = useState("12/10/2022")

  // Sample data
  const students = [
    { id: 1, name: "Student 1", totalLeave: 3, totalPresent: 97, attendance: 97 },
    { id: 2, name: "Student 1", totalLeave: 3, totalPresent: 97, attendance: 97 },
    { id: 3, name: "Student 1", totalLeave: 3, totalPresent: 97, attendance: 97 },
    { id: 4, name: "Student 1", totalLeave: 3, totalPresent: 97, attendance: 97 },
    { id: 5, name: "Student 1", totalLeave: 3, totalPresent: 97, attendance: 97 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">Student Attendance</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-600">From</label>
            <div className="relative">
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border rounded-md bg-gray-100"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600">Upto</label>
            <div className="relative">
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border rounded-md bg-gray-100"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md self-end hover:bg-gray-700 transition-colors">
            Submit
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Total leave</th>
                <th className="px-6 py-3 text-left">Total Present</th>
                <th className="px-6 py-3 text-left">Attendance(%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.totalLeave}</td>
                  <td className="px-6 py-4">{student.totalPresent}</td>
                  <td className="px-6 py-4">{student.attendance}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={3} className="px-6 py-4 text-right font-medium">
                  Total days
                </td>
                <td colSpan={2} className="px-6 py-4">
                  100
                </td>
              </tr>
            </tbody>
          </table>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
            Back
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}