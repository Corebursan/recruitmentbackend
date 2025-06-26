import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <header className="bg-blue-700 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold">Recruitment_E2E</Link>

        {/* Center Navigation */}
        <nav className="space-x-6 text-sm">
          {user && (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/add-job" className="hover:underline">Add Job</Link>
              <Link to="/jd-generator" className="hover:underline">JD Generator</Link> {/* ✅ Added */}
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </>
          )}
        </nav>

        {/* Right Auth Buttons */}
        <div className="space-x-4 text-sm">
          {user ? (
            <>
              <span className="font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
