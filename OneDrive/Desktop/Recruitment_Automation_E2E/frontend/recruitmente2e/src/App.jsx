import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JDGenerator from "./pages/JDGenerator";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/jd-generator" element={<JDGenerator />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
