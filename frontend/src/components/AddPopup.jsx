import React from 'react';
import { FaTimes } from "react-icons/fa";

export const AddPopup = ({ setIsOpen, handleSubmit, error, loading, name, setName, rollNumber, setRollNumber }) => {
  return (
    <div className="p-6 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
          <span className="sr-only">Close</span>
        </button>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none px-4 py-2 bg-slate-200 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div className="flex flex-col gap-3 mb-4">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              name='rollNumber'
              type="number"
              value={rollNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setRollNumber(value);
                }
              }}
              className="outline-none px-4 py-2 bg-slate-200 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {loading && <p className="text-blue-500">Adding student...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <button type="submit" className="bg-green-800 px-4 py-2 text-white rounded-lg" disabled={loading}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
