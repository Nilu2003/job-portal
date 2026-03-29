import React, { useEffect, useState } from 'react'
import JobCard from '../component/JobCard'
import API from '../api/api'

const Jobs = () => {
  const [jobs,setJobs]= useState([])
  
    useEffect(()=>{
      const fetchJob= async () =>{
         try {
          const res= await API.get("/jobs/getalljob")
          setJobs(res.data.data)
         } catch (error) {
          console.log("something error whlie job carrds-job route",error);  
         }
      }

      fetchJob()
    },[])

  return (
    <div className="flex gap-6 p-6  min-h-screen">

      {/* LEFT FILTER PANEL */}
      <div className="w-64 bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

        {/* Location */}
        <div className="mb-6">
          <p className="font-medium mb-2">Location</p>
          {["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input type="radio" name="location" />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Industry */}
        <div className="mb-6">
          <p className="font-medium mb-2">Industry</p>
          {["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input type="radio" name="industry" />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* Salary */}
        <div>
          <p className="font-medium mb-2">Salary</p>
          {["0 - 40k", "42k to 1 lakh", "1 lakh to 5 lakh"].map((item, index) => (
            <label key={index} className="flex items-center gap-2 mb-1 cursor-pointer">
              <input type="radio" name="salary" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT JOB LIST */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {
          jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        }
        
      </div>

    </div>
  )
}

export default Jobs