import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className='flex flex-row justify-around mt-3'>
        <div className='text-3xl font-bold'>Logo</div>
        <ul className='flex flex-row gap-4 font-semibold'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/applications">Application</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <div className='flex flex-row gap-4'>
            <button className='border rounded '>Log In</button>
            <button className='border rounded bg-blue-600 text-white'>SignUp</button>
        </div>
    </div>
  )
}

export default Navbar