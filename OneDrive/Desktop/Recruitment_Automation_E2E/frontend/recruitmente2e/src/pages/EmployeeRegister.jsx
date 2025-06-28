import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const EmployeeRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/employee/register', { name, email, empId, password });
      alert(res.data);
      navigate('/employee/employee-login');
    } catch (err) {
      alert(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Employee Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Name" className="w-full border p-2 rounded" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" className="w-full border p-2 rounded" />
          <input type="text" value={empId} onChange={e => setEmpId(e.target.value)} required placeholder="Employee ID" className="w-full border p-2 rounded" />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full border p-2 rounded pr-10" />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-2 top-2">{showPassword ? '🙈' : '👁️'}</button>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        </form>
        <p className="mt-4 text-sm text-center">Already have an account? <Link to="/employee/employee-login" className="text-green-700 font-medium">Login</Link></p>
      </div>
    </div>
  );
};

export default EmployeeRegister;
