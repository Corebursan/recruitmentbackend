import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Job', path: '/add-job' },
    { name: 'JD Generator', path: '/jd-generator' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-white font-bold text-2xl tracking-wide hover:scale-105 transition-transform duration-300"
        >
          Recruitment_Automation_E2E
        </Link>

        {/* Nav Links */}
        <div className="flex-1 flex justify-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-md font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-white hover:bg-white hover:text-blue-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Login & Register */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
