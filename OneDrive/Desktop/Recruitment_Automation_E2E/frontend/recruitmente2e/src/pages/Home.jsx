import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/current-user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => navigate('/login'));
  }, []);

  if (!user) return null;

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl shadow-lg p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold mb-4">Welcome, {user.name} 👋</h1>
        <p className="text-lg text-blue-100 mb-6">
          You’ve successfully logged into <span className="font-semibold">Recruitment_E2E</span>. Automate your hiring process — from job intake to resume matching.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/add-job"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition"
          >
            ➕ Add New Job
          </Link>
          <Link
            to="/jd-generator"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition"
          >
            🧾 Generate JD
          </Link>
          <Link
            to="/dashboard"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-100 transition"
          >
            📊 Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
