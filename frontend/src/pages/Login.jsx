import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center items-center mt-25 '>
      <div className=' w-80 md:w-100 lg:w-120 h-50 md:h-55  bg-white shadow-2xl flex flex-col p-2 md:p-3 lg:p-4 rounded-3xl '>
        <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Username/Email:</label>
        <input type="text" className='border-2 m-1 rounded-md' />
        <label htmlFor="password" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Password:</label>
        <input type="password" className='border-2 m-1 rounded-md' />
        <div >
          <p className='text-[14px] md:text-[15px] font-semibold'>Profile Type:</p>
          <input type="radio"  />
          <label htmlFor="" className='m-0.5 text-[13px] md:text-[14px]'>users</label>
          <input type="radio" />
          <label htmlFor="" className='m-0.5 text-[13px] md:text-[14px]'>admin</label>
        </div>
        <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-40 rounded-lg'>Login</button>
      </div>
    </div>
  )
}

export default Login