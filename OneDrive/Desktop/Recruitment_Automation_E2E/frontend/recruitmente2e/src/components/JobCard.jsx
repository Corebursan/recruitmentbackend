import { useState } from 'react';
import { Bookmark, CheckCircle, X } from 'lucide-react';

const JobCard = ({ job, isSelected, onSelect, onApply, onBookmark }) => {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`cursor-pointer bg-white rounded-2xl shadow-md border p-4 mb-4 transition duration-300 ${isSelected ? 'border-blue-600 ring-2 ring-blue-300' : 'hover:shadow-xl'}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
          🔥 Urgent Hiring
        </span>
        <Bookmark
          className="text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(job);
          }}
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mt-2">{job.title}</h2>

      <p className="text-gray-600 mt-1">
        🏢 <span className="font-medium">{job.company}</span> &nbsp;&nbsp;📍 {job.location}
      </p>

      <p className="text-sm text-green-700 font-medium mt-1">
        💰 Salary: {job.minSalary} - {job.maxSalary}
      </p>

      {/* Job Tags */}
      <div className="flex gap-2 mt-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${job.mode === 'Remote' ? 'bg-blue-100 text-blue-700' : job.mode === 'Hybrid' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
          {job.mode}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${job.jobType === 'Internship' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
          {job.jobType}
        </span>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
        >
          ✅ Easily Apply
        </button>
        <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition">
          ⭐ Mark as My Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;
