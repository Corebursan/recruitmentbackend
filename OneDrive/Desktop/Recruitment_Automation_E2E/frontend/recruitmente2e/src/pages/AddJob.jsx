import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance'; // ✅ Make sure this path is correct
import { useEffect, useState } from 'react';

const AddJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [user, setUser] = useState(null);

  // ✅ Fetch currently logged-in employer
  useEffect(() => {
    axios
      .get('/auth/current-user', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      alert('⚠️ Please login as an employer to post a job.');
      return;
    }

    const jobData = {
      title: data.title,
      company: data.company || user.company || 'N/A',
      location: data.location,
      salary: data.salaryRange,
      experience: data.experience,
      jobType: data.type,
      description: data.description,
      contactEmail: data.contactEmail,
      department: data.department,
      employmentType: data.employmentType,
      openings: data.openings,
      lastDate: data.lastDate,
      mode: data.mode,
      requirements: data.requirements,
      perks: data.perks,
    };

    try {
      await axios.post('/jobs', jobData, { withCredentials: true });
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

      <div>
        <input
          type="text"
          placeholder="Job Title"
          {...register('title', { required: 'Job title is required' })}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}
      </div>

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

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Location"
          {...register('location', { required: 'Location is required' })}
          className="w-1/2 border px-4 py-2 rounded"
        />
        <select {...register('mode')} className="w-1/2 border px-4 py-2 rounded">
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      {errors.location && <p className="text-red-600 text-xs">{errors.location.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Salary Range"
          {...register('salaryRange')}
          className="border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Openings"
          {...register('openings', { min: 1 })}
          className="border px-4 py-2 rounded"
        />
        <input
          type="date"
          {...register('lastDate')}
          className="border px-4 py-2 rounded"
        />
      </div>

      <div>
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
      </div>

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
