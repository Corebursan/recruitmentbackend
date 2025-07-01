import { useEffect, useState, useRef } from 'react';
import axios from '../api/axiosInstance';
import JobCard from '../components/JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({ location: '', company: '' });
  const [sortBy, setSortBy] = useState('latest');
  const [bookmarked, setBookmarked] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    fetchJobs();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasMore]);

  useEffect(() => {
    if (page > 0) fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/jobs/all?page=${page}`);
      const newJobs = res.data || [];
      const uniqueNewJobs = newJobs.filter(
        (job) => !jobs.some((existing) => existing.jobId === job.jobId)
      );
      setJobs((prev) => [...prev, ...uniqueNewJobs]);
      setHasMore(uniqueNewJobs.length > 0);
      if (!selectedJob && uniqueNewJobs.length > 0) {
        setSelectedJob(uniqueNewJobs[0]);
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (jobId) => {
    setBookmarked((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = (jobId) => {
    alert(`✅ Successfully applied to job ID: ${jobId}`);
  };

  const sortJobs = (jobList) => {
    if (sortBy === 'latest') {
      return jobList.slice().sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
    } else if (sortBy === 'salary') {
      return jobList.slice().sort((a, b) => parseFloat(b.maxSalary) - parseFloat(a.maxSalary));
    }
    return jobList;
  };

  const filteredJobs = sortJobs(
    jobs.filter((job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      job.company.toLowerCase().includes(filters.company.toLowerCase())
    )
  );

  return (
    <div className="w-full space-y-4">
      {/* 🔍 Filter + Sort Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center gap-4 sticky top-0 z-10">
        <input
          type="text"
          placeholder="Filter by Location"
          className="border rounded px-4 py-2 w-full md:w-1/3"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Company"
          className="border rounded px-4 py-2 w-full md:w-1/3"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        >
          <option value="latest">📅 Latest First</option>
          <option value="salary">💰 Highest Salary</option>
        </select>
      </div>

      {/* 💼 Job List and Preview */}
      <div className="flex gap-6">
        {/* Left Panel: Job Cards */}
        <div className="w-1/2 h-[70vh] overflow-y-auto pr-4">
          {filteredJobs.map((job) => (
            <div
              key={job.jobId}
              onClick={() => {
                setSelectedJob(job);
                setShowFullDetails(false);
              }}
              className={`cursor-pointer ${selectedJob?.jobId === job.jobId ? 'ring-2 ring-blue-500 rounded-md' : ''}`}
            >
              <JobCard
                job={job}
                onApply={() => handleApply(job.jobId)}
                onBookmark={() => handleBookmark(job.jobId)}
                isBookmarked={bookmarked.includes(job.jobId)}
              />
            </div>
          ))}
          {loading && (
            <div className="text-center py-4 text-gray-400 animate-pulse">Loading more jobs...</div>
          )}
          {hasMore && <div ref={loader} className="text-center py-4 text-sm text-gray-500">Scroll to load more...</div>}
        </div>

        {/* Right Panel: Selected Job Details */}
        <div className="w-1/2 sticky top-[130px] self-start h-[70vh] overflow-y-auto bg-white p-6 shadow-lg rounded-xl">
          {selectedJob ? (
            <>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                <button
                  onClick={() => setShowFullDetails((prev) => !prev)}
                  className="text-sm text-blue-600 underline"
                >
                  {showFullDetails ? 'Show Less' : 'View More'}
                </button>
              </div>
              <p className="text-gray-600 mt-2">🏢 {selectedJob.company}</p>
              <p className="text-gray-600">📍 {selectedJob.location}</p>
              <p className="text-green-700 mt-2 font-semibold">
                💰 {selectedJob.minSalary} - {selectedJob.maxSalary}
              </p>
              {!showFullDetails ? (
                <p className="mt-4 text-sm text-gray-700 line-clamp-3">{selectedJob.description}</p>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <p><strong>Description:</strong> {selectedJob.description}</p>
                  <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
                  <p><strong>Perks:</strong> {selectedJob.perks}</p>
                  <p><strong>Experience:</strong> {selectedJob.experience}</p>
                  <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
                  <p><strong>Employment Type:</strong> {selectedJob.employmentType}</p>
                  <p><strong>Department:</strong> {selectedJob.department}</p>
                  <p><strong>Mode:</strong> {selectedJob.mode}</p>
                  <p><strong>Openings:</strong> {selectedJob.openings}</p>
                  <p><strong>Opening Date:</strong> {selectedJob.openingDate}</p>
                  <p><strong>Last Date to Apply:</strong> {selectedJob.lastDate}</p>
                  <p><strong>Contact Email:</strong> {selectedJob.contactEmail}</p>
                </div>
              )}
              {/* ✅ Apply Button in Right Panel */}
              <button
                onClick={() => handleApply(selectedJob.jobId)}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                ✅ Apply to this Job
              </button>
            </>
          ) : (
            <p className="text-gray-400 italic">Select a job to view details</p>
          )}
        </div>
      </div>

      {/* 🔝 Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700"
      >
        ⬆ Back to Top
      </button>
    </div>
  );
};

export default JobList;
