import { Routes, Route } from 'react-router-dom';
import EmployeeLogin from './EmployeeLogin';
import EmployeeRegister from './EmployeeRegister';
import EmpHome from './EmpHome';

const Employee = ({ setEmployee }) => {
  return (
    <Routes>
      <Route path="employee-login" element={<EmployeeLogin setUser={setEmployee} />} />
      <Route path="employee-register" element={<EmployeeRegister />} />
      <Route path="home" element={<EmpHome />} />
    </Routes>
  );
};

export default Employee;
