import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Job', path: '/add-job' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-white shadow p-4 mb-6 flex space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-lg font-medium ${
            location.pathname === item.path
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
