import { useState } from 'react';

const JDGenerator = () => {
  const [manualJD, setManualJD] = useState('');

  const handleGenerateJD = (e) => {
    e.preventDefault();
    alert("✅ JD submitted! We'll parse it soon.");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-14">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-blue-700">JD Generator Portal</h2>

      
      {/* Manual Intake */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Paste JD (Manual Intake)</h3>
        <form onSubmit={handleGenerateJD} className="space-y-4">
          <textarea
            value={manualJD}
            onChange={(e) => setManualJD(e.target.value)}
            rows={8}
            placeholder="e.g., We are hiring a Frontend Developer with React experience..."
            className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            Submit JD for Processing
          </button>
        </form>
      </div>

      {/* Vision / Coming Soon */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <h4 className="text-xl font-semibold mb-3">🚀 What’s Next?</h4>
        <ul className="list-disc pl-5 space-y-2 text-blue-100">
          <li>📩 JD intake via client portal or email parsing</li>
          <li>🧠 Automatic extraction of title, skills, experience, and location</li>
          <li>⚙️ Integration with LLMs to generate and improve job descriptions</li>
        </ul>
        <p className="mt-4 text-sm text-blue-200 italic">
          Want to collaborate or test JD parsing? Contact us!
        </p>
      </div>
    </div>
  );
};

export default JDGenerator;