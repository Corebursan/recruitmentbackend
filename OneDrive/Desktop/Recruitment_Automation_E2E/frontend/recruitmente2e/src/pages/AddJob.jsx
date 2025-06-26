import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState("");

  const handleSubmit = () => {
    console.log("Job Title Submitted:", jobTitle);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
      <InputField
        label="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="e.g., Frontend Developer"
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default AddJob;
