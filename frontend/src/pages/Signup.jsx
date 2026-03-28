import React, { useState } from 'react'
import API from "../api/api.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../features/auth/authSlice'




const Signup = () => {
     
  const [formData,setFormData]=useState({
       username:"",
       fullName:"",
       email:"",
       password:"",
       phoneNumber:"",
       role:"",

})

const handleChange= (e) => {
  setFormData({
    ...formData,
    [e.target.name]:e.target.value
  })
}
 const dispatch=useDispatch()
 const navigate=useNavigate()
const handleSubmit= async () =>{
  try {
    const res= await API.post("/users/register",formData)
    console.log(res);
    
     dispatch(loginSuccess(res.data.data))
     navigate("/")
  } catch (error) {
    console.log("something wrong while register(signup)",error);
    
  }
}

  return (
    <div className='flex justify-center items-center mt-25 '>
      <div className=' w-80 md:w-100 lg:w-120 h-90 md:h-95 lg:h-100 bg-white shadow-2xl flex flex-col p-2 md:p-3 lg:p-4 rounded-3xl '>
        <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Username:</label>
        <input type="text" 
        className='border-2 m-1 rounded-md' 
        name='username'
        value={formData.username}
        onChange={handleChange}
        />
        <label htmlFor="fullName" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Full Name:</label>
        <input type="text" 
        className='border-2 m-1 rounded-md'
        name="fullName"
        value={formData.fullName}
        onChange={handleChange} 
        />
        <label htmlFor="email" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold' >Email:</label>
        <input type="email" 
        className='border-2 m-1 rounded-md' 
        name="email"
        value={formData.email}
        onChange={handleChange} 
        />
        <label htmlFor="password" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Password:</label>
        <input type="password" 
        className='border-2 m-1 rounded-md' 
        name="password"
        value={formData.password}
        onChange={handleChange} 
        />
        <label htmlFor="mobile number" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Mobile Number:</label>
        <input type="number" className='border-2 m-1 rounded-md' 
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange} 
        />
        <div >
          <p className='text-[14px] md:text-[15px] font-semibold'>Role:</p>
          <input type="radio"
           name='role'
           value='user'
           checked={formData.role === "user"}
           onChange={handleChange}

          />

          <span className='m-0.5 text-[13px] md:text-[14px]'>User</span>
          <input type="radio" 
           name='role'
           value='admin'
           checked={formData.role === "admin"}
           onChange={handleChange}
          />
          <span className='m-0.5 text-[13px] md:text-[14px]'>Admin</span>
        </div>
        <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-40 rounded-lg'
        onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Signup