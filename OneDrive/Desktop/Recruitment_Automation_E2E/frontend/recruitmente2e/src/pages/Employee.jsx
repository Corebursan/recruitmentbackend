// Employee.jsx
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeLogin from './EmployeeLogin';
import EmployeeRegister from './EmployeeRegister';
import EmpHome from './EmpHome';
import AddJob from './Addjob';
import JDGenerator from './JDGenerator';
import Dashboard from './Dashboard';
import axios from '../api/axiosInstance';

const Employee = ({ employee, setEmployee }) => {
  useEffect(() => {
    axios.get('/auth/employee/current-employee', { withCredentials: true })
      .then(res => setEmployee(res.data))
      .catch(() => setEmployee(null));
  }, [setEmployee]);

  return (
    <Routes>
      <Route path="employee-login" element={<EmployeeLogin setUser={setEmployee} />} />
      <Route path="employee-register" element={<EmployeeRegister />} />
      <Route
        path="home"
        element={employee ? <EmpHome /> : <Navigate to="/employee/employee-login" />}
      />
      <Route
        path="add-job"
        element={employee ? <AddJob /> : <Navigate to="/employee/employee-login" />}
      />
      <Route
        path="jd-generator"
        element={employee ? <JDGenerator /> : <Navigate to="/employee/employee-login" />}
      />
      <Route
        path="dashboard"
        element={employee ? <Dashboard /> : <Navigate to="/employee/employee-login" />}
      />
    </Routes>
  );
};

export default Employee;
