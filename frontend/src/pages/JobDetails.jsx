import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/api'

const JobDetails = () => {
   const [job,setJob]=useState(null)
    const {id}=useParams()
    console.log(id);
    

    useEffect(()=>{
        const fetchjob = async () =>{
            try {
                const res= await API.get(`/jobs/getjob/${id}`)
                console.log(res);
                
                setJob(res.data.data)

            } catch (error) {
                console.log("error while fetching job details",error);
                
            }
        }

        fetchjob()


    },[id])

    if(!job)  return <p>Loading....</p>

  return (
    <div>
        <p>job title:{job.title}</p>
        <p>desscription :{job.description}</p>
        <p>company:{job.companyName}</p>
    </div>
  )
}

export default JobDetails