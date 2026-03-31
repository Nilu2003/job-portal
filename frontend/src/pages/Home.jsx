import { useEffect, useState } from "react"
import API from "../api/api"
import JobCard from "../component/JobCard"



const Home = () => {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const delay = setTimeout(() => {

      const fetchJobs = async () => {
        try {
          setLoading(true)

          const res = await API.get("/jobs/getalljob", {
            params: {
              keyword: search,
              location,
              type: jobType,
              page
            }
          })

          setJobs(res.data.data)

        } catch (error) {
          console.log("Error fetching jobs", error)
        } finally {
          setLoading(false)
        }
      }

      fetchJobs()

    }, 500)

    return () => clearTimeout(delay)

  }, [search, location, jobType, page])

  if (loading) return <p>Loading...</p>

  return (
    <div className='flex flex-col justify-center items-center mt-10 md:mt-15 lg:mt-20 gap-3'>
    <div className='bg-amber-50 shadow rounded-2xl w-34 md:w-38 lg:w-45 h-4 md:h-5 lg:h-7.5 text-red-400 text-center text-[8px] md:text-[12px] lg:text-[15px]'> No. 1 Jub Hunt  Website</div>
        <div className='text-2xl md:text-3xl lg:text-4xl text-center font-bold w-60 md:w-80 lg:w-100'>Search,apply & Get Your Dream Jobs</div>
        <div className='text-center w-80 md:w-100 lg:w-175'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptates molestiae! Eaque, similique? Cupiditate dignissimos, ab voluptate of.</div>
      <input
        type="text"
        placeholder="🔍 Find your Dream jobs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-amber-50 shadow-2xl p-2 rounded mt-5'
      />

      {jobs.length === 0 ? (
        <p className="mt-10 text-gray-500">No jobs found 😢</p>
      ) : (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}


export default Home