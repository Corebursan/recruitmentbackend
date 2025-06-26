import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    jobsPosted: 12,
    applications: 87,
    hired: 4,
    interviews: 16,
  });

  useEffect(() => {
    // 👉 Later: Fetch real analytics from backend
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600 text-sm">Track recruitment metrics and performance insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{stats.jobsPosted}</h3>
          <p className="text-gray-600 mt-1">Jobs Posted</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-indigo-600">{stats.applications}</h3>
          <p className="text-gray-600 mt-1">Applications</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">{stats.hired}</h3>
          <p className="text-gray-600 mt-1">Candidates Hired</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-yellow-600">{stats.interviews}</h3>
          <p className="text-gray-600 mt-1">Interviews Scheduled</p>
        </div>
      </div>

      {/* Analytics Coming Soon */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow text-white">
        <h4 className="text-xl font-semibold mb-2">📊 Advanced Analytics Coming Soon</h4>
        <ul className="list-disc pl-6 text-sm space-y-1 text-blue-100">
          <li>Applicant funnel visualization</li>
          <li>Job-wise success rate & drop-offs</li>
          <li>Monthly hiring trends</li>
          <li>Time to hire & source quality tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
