import React from 'react'
import { FaBell, FaCog, FaSearch } from "react-icons/fa"

const Nav = ({clickHandle}) => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-900">
    <h1 className="text-xl font-semibold text-white"> {clickHandle === 'data' ? 'Student Attendance Data' : 'Attendance Report'}</h1>
    <div className="flex items-center gap-4">
      <div className="relative">
        <FaSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
        <FaBell className="h-5 w-5" />
      </button>
      <button className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
        <FaCog className="h-5 w-5" />
      </button>
    </div>
  </nav>
  )
}

export default Nav