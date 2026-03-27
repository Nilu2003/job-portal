import React from 'react'
import Hero from '../component/Hero'
import JobCard from '../component/JobCard'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
    <div>
      <Hero/>
    </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  )
}

export default Home