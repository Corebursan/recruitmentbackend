import { useState } from 'react';

const JDGenerator = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [generatedJD, setGeneratedJD] = useState('');
  const [customJD, setCustomJD] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

 const handleGenerate = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.get(`/api/jd/generate?title=${jobTitle}`);
    setGeneratedJD(res.data);
    setCustomJD(res.data);
    setIsGenerated(true);
  } catch (err) {
    console.error('❌ Error generating JD:', err);
    alert('Failed to generate JD. Try again later.');
  }
};


  const handleSubmitJD = () => {
    alert('✅ JD submitted:\n\n' + customJD);
    setIsGenerated(false);
    setJobTitle('');
    setGeneratedJD('');
    setCustomJD('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h2 className="text-4xl font-bold text-center text-indigo-700">🧾 Auto JD Generator</h2>

      <form onSubmit={handleGenerate} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Job Title (e.g. Frontend Developer)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Generate JD
        </button>
      </form>

      {isGenerated && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">✍️ Editable Job Description:</h3>
          <textarea
            rows={12}
            value={customJD}
            onChange={(e) => setCustomJD(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmitJD}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit JD
          </button>
        </div>
      )}
    </div>
  );
};

export default JDGenerator;
