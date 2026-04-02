import React, { useEffect, useState } from 'react'
import JobCard from '../component/JobCard'
import API from '../api/api'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    location: "",
    keyword: "",
    salary: ""
  })

  // Fetch Jobs
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)

        const res = await API.get("/jobs/getalljob", {
          params: filters
        })

        setJobs(res.data.data)

        console.log(res.data.data);
        
      } catch (error) {
        console.log("Error fetching jobs", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [filters])

  // Toggle filter select/unselect
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value
    }))
  }

  return (
    <div className="flex flex-row lg:flex-row gap-6 p-4 ">

      {/* FILTER PANEL */}
      <div className="w-50 lg:w-64 bg-white rounded-xl shadow-md p-3 md:p-5 ">
        <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

        {/* Location */}
        <div className="mb-6">
          <p className="font-medium mb-2">Location</p>
          {["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="radio"
                name="location"
                checked={filters.location === item}
                onChange={() => handleFilterChange("location", item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Industry */}
        <div className="mb-6">
          <p className="font-medium mb-2">Industry</p>
          {["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="radio"
                name="keyword"
                checked={filters.keyword === item}
                onChange={() => handleFilterChange("keyword", item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Salary */}
        <div className="mb-6">
          <p className="font-medium mb-2">Salary</p>
          {["0 - 40k", "42k to 1 lakh", "1 lakh to 5 lakh"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input
                type="radio"
                name="salary"
                checked={filters.salary === item}
                onChange={() => handleFilterChange("salary", item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Clear Filters */}
        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg"
          onClick={() =>
            setFilters({ location: "", keyword: "", salary: "" })
          }
        >
          Clear Filters
        </button>
      </div>

      {/* JOB LIST */}
      <div className="flex-1">

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && (
          <div className="grid grid-cols-2  lg:grid-cols-3 gap-3">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default Jobs