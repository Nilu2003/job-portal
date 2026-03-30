import React, { useEffect, useState } from 'react'
import Hero from '../component/Hero'
import JobCard from '../component/JobCard'
import API from "../api/api.js"

const Home = () => {
     const [jobs,setJobs]=useState([])

     useEffect(() => {
      const fetchJobs= async () =>{
        try {
          const res= await API.get("/jobs/getalljob")
          console.log(res);
          
          setJobs(res.data.data)
        } catch (error) {
          console.log("job not fetched sucessfully",error);
          
        }
      }

      fetchJobs()
     },[])

     if(jobs.length===0) return <p>Loading.......</p>

  return (
    <div className='flex flex-col justify-center items-center '>
    <div>
      <Hero/>
    </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {jobs.map((job) =>(
          <JobCard key={job._id} job={job}/>
        )
        )}
      </div>
    </div>
  )
}

export default Home