import React, { useEffect, useState } from 'react'
import API from '../api/api'
import JobCard from '../component/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setJobs } from '../features/jobs/jobSlice'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
   
  const {jobs} =useSelector((state) => state.jobs)
  const dispatch= useDispatch()
  const navigate =useNavigate() 
  useEffect(()=>{
    const fetchJobs = async ()=>{
      try {
        const res= await API.get("/jobs/createdjoblist")
        dispatch(setJobs(res.data.data))
        
      } catch (error) {
        console.log("something error while jobs fetching",error);
        
      }
    }

    fetchJobs()
  },[])


  return (
    <div>
      <div className='flex flex-row justify-between ml-8 mt-6 mr-9'>
        <div className='text-[30px] text-shadow-gray-600 font-bold'>Jobs</div>
        <div><button 
        className='border border-blue-600 bg-blue-500 rounded-md '
          onClick={()=> navigate("/admin/addjob")}
        >Add Jobs</button></div>
      </div>
      <hr className='ml-6 mr-9 text-shadow-gray-600'/>
      <div>
        {jobs.length==0 ? (
          <p>job are not found</p>
        ):(
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 m-20'>
            {jobs.map((job) =>(
               <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard