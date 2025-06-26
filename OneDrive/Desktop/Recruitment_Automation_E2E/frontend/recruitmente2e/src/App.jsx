import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JDGenerator from "./pages/JDGenerator";

const App = () => {
  return (
    <div className="p-4">
      <nav className="mb-6 space-x-4 border-b pb-2">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/add-job" className="text-blue-600 hover:underline">Add Job</Link>
        <Link to="/jd-generator" className="text-blue-600 hover:underline">JD Generator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/jd-generator" element={<JDGenerator />} />
      </Routes>
    </div>
  );
};

export default App;
