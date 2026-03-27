import React from 'react'

const Signup = () => {
  return (
    <div className='flex justify-center items-center mt-25 '>
      <div className=' w-80 md:w-100 lg:w-120 h-90 md:h-95 lg:h-100 bg-white shadow-2xl flex flex-col p-2 md:p-3 lg:p-4 rounded-3xl '>
        <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Username:</label>
        <input type="text" className='border-2 m-1 rounded-md' />
        <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Full Name:</label>
        <input type="text" className='border-2 m-1 rounded-md' />
        <label htmlFor="email" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold' >Email:</label>
        <input type="email" className='border-2 m-1 rounded-md' />
        <label htmlFor="password" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Password:</label>
        <input type="password" className='border-2 m-1 rounded-md' />
        <label htmlFor="mobile number" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Mobile Number:</label>
        <input type="number" className='border-2 m-1 rounded-md' />
        <div >
          <p className='text-[14px] md:text-[15px] font-semibold'>Profile Type:</p>
          <input type="radio" className='' />

          <span className='m-0.5 text-[13px] md:text-[14px]'>User</span>
          <input type="radio" />
          <span className='m-0.5 text-[13px] md:text-[14px]'>Admin</span>
        </div>
        <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-40 rounded-lg'>Submit</button>
      </div>
    </div>
  )
}

export default Signup