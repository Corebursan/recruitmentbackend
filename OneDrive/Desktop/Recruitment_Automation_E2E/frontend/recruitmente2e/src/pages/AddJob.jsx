import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const predefinedLocations = [
  'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune',
  'Chennai', 'Kolkata', 'Noida', 'Gurgaon', 'Ahmedabad',
];

const AddJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
    setValue, // ✅ required to update form state for location
  } = useForm();

  const [user, setUser] = useState(null);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const watchLocation = watch('location', '');

  useEffect(() => {
    axios
      .get('/auth/employee/current-employee', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      alert('⚠️ Please login as an employer to post a job.');
      return;
    }

    const minSalary =
      (parseInt(data.minSalaryLakh || 0) * 100000) +
      (parseInt(data.minSalaryThousand || 0) * 1000);
    const maxSalary =
      (parseInt(data.maxSalaryLakh || 0) * 100000) +
      (parseInt(data.maxSalaryThousand || 0) * 1000);

    const openingDate = new Date(data.lastDate);
    const expiryDate = new Date(data.expiryDate);

    if ((data.maxSalaryLakh || data.maxSalaryThousand) && minSalary >= maxSalary) {
      setError("maxSalaryLakh", { message: "Max salary must be greater than min salary." });
      return;
    }

    if (expiryDate <= openingDate) {
      setError("expiryDate", { message: "Expiry date must be after the last date to apply." });
      return;
    }

    const jobData = {
  jobId: uuidv4(),
  title: data.title,
  company: data.companyName?.trim() || user.company || 'N/A',
  location: data.location,
  minSalary: `${(minSalary / 100000).toFixed(2)}L`,
  maxSalary: `${(maxSalary / 100000).toFixed(2)}L`,
  experience: data.experience,
  jobType: data.type,
  description: data.description,
  contactEmail: data.contactEmail,
  department: data.department,
  employmentType: data.employmentType,
  openings: data.openings,
  openingDate: data.lastDate,  // ✅ map correctly
  lastDate: data.expiryDate,  // ✅ map correctly
  mode: data.mode,
  requirements: data.requirements,
  perks: data.perks,
};


    try {
      await axios.post('api/jobs/add-job', jobData, { withCredentials: true });
      alert('✅ Job posted successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to post job. Please try again later.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-sm text-gray-700 max-w-3xl mx-auto bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📝 Add New Job</h2>

      {/* Job Title */}
      <input
        type="text"
        placeholder="Job Title"
        {...register('title', { required: 'Job title is required' })}
        className="w-full border px-4 py-2 rounded"
      />
      {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}

      {/* Company Name */}
      <input
        type="text"
        placeholder="Company Name"
        {...register('companyName')}
        className="w-full border px-4 py-2 rounded"
      />

      {/* Job Type & Department */}
      <div className="flex gap-4">
        <select {...register('type')} className="w-1/2 border px-4 py-2 rounded">
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>
        <input
          type="text"
          placeholder="Department"
          {...register('department')}
          className="w-1/2 border px-4 py-2 rounded"
        />
      </div>

      {/* Employment Type & Experience */}
      <div className="flex gap-4">
        <select {...register('employmentType')} className="w-1/2 border px-4 py-2 rounded">
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
        </select>
        <input
          type="text"
          placeholder="Experience Required"
          {...register('experience')}
          className="w-1/2 border px-4 py-2 rounded"
        />
      </div>

      {/* Location with Dropdown */}
      <div className="relative">
        <input
          type="text"
          placeholder="Location"
          {...register('location', { required: 'Location is required' })}
          className="w-full border px-4 py-2 rounded"
          onFocus={() => setShowLocationOptions(true)}
          onBlur={() => setTimeout(() => setShowLocationOptions(false), 100)}
        />
        {showLocationOptions && (
          <ul className="absolute z-10 bg-white w-full border mt-1 rounded shadow max-h-40 overflow-y-auto">
            {predefinedLocations
              .filter((loc) => loc.toLowerCase().includes(watchLocation.toLowerCase()))
              .map((loc, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    clearErrors('location');
                    setValue('location', loc); // ✅ Fixes the form state
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {loc}
                </li>
              ))}
          </ul>
        )}
        {errors.location && <p className="text-red-600 text-xs">{errors.location.message}</p>}
      </div>

      {/* Salary Fields */}
      <div>
        <label className="block font-medium mb-1">Min Salary (in ₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Lakhs"
            {...register('minSalaryLakh', { valueAsNumber: true })}
            className="w-1/2 border px-4 py-2 rounded"
          />
          <input
            type="number"
            min="0"
            placeholder="Thousands"
            {...register('minSalaryThousand', { valueAsNumber: true })}
            className="w-1/2 border px-4 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Max Salary (in ₹)</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Lakhs"
            {...register('maxSalaryLakh', { valueAsNumber: true })}
            className="w-1/2 border px-4 py-2 rounded"
          />
          <input
            type="number"
            min="0"
            placeholder="Thousands"
            {...register('maxSalaryThousand', { valueAsNumber: true })}
            className="w-1/2 border px-4 py-2 rounded"
          />
        </div>
        {errors.maxSalaryLakh && (
          <p className="text-red-600 text-xs">{errors.maxSalaryLakh.message}</p>
        )}
      </div>

      {/* Openings and Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Openings</label>
          <input
            type="number"
            placeholder="Number of openings"
            {...register('openings', { min: 1 })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Openning Date to Apply</label>
          <input
            type="date"
            {...register('lastDate', { required: true })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Closing Date to Apply</label>
        <input
          type="date"
          {...register('expiryDate', { required: true })}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.expiryDate && (
          <p className="text-red-600 text-xs">{errors.expiryDate.message}</p>
        )}
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="Hiring Manager Email"
        {...register('contactEmail', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format',
          },
        })}
        className="w-full border px-4 py-2 rounded"
      />
      {errors.contactEmail && (
        <p className="text-red-600 text-xs">{errors.contactEmail.message}</p>
      )}

      {/* Description and Skills */}
      <textarea
        placeholder="Job Description"
        {...register('description')}
        rows="4"
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        placeholder="Required Skills & Qualifications"
        {...register('requirements')}
        rows="4"
        className="w-full border px-4 py-2 rounded"
      />
      <textarea
        placeholder="Perks and Benefits (Optional)"
        {...register('perks')}
        rows="3"
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition w-full"
      >
        Submit Job
      </button>
    </form>
  );
};

export default AddJob;
