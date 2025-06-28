// App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import JDGenerator from './pages/JDGenerator';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from './api/axiosInstance';
import Employee from './pages/Employee';

const App = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);

  //  this is user part
  useEffect(() => {
    axios.get('/auth/user/current-user', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  //   this is employee part

  useEffect(() => {
    axios.get('/auth/employee/current-employee', { withCredentials: true })
      .then((res) => setEmployee(res.data))
      .catch(() => setEmployee(null));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} setUser={setUser} employee={employee} setEmployee={setEmployee} />


      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        <Routes>
          <Route path='/employee/*' element={<Employee setEmployee={setEmployee} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<Home />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/jd-generator" element={<JDGenerator />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;