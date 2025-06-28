import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const EmployeeLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/employee/login', { email, password });
      const res = await axios.get('/auth/employee/current-employee');
      setUser(res.data);
      navigate('/employee/home'); // ✅ Redirect to EmpHome
    } catch (err) {
      alert(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Employee Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full border p-2 rounded" />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full border p-2 rounded pr-10" />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-2 top-2">{showPassword ? '🙈' : '👁️'}</button>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-sm text-center">Don’t have an account? <Link to="/employee/employee-register" className="text-blue-700 font-medium">Register</Link></p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
