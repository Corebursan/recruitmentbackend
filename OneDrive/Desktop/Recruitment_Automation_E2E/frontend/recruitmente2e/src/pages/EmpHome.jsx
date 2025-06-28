import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const EmpHome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/employee/current-employee')
      .then(res => setUser(res.data))
      .catch(() => navigate('/employee/employee-login'));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome {user.name}</h1>
      <p className="text-lg text-gray-700 mb-6">This is your Employee Dashboard</p>
    </div>
  );
};

export default EmpHome;
