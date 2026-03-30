import React from 'react'
import { useState } from 'react'
import API from "../api/api.js"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess, logout } from '../features/auth/authSlice'

const Login = () => {

  const [fromData,setFromData]=useState({
    username:"",
    password:"",
    role:"" 
  })

  const handleChange = (e) =>{
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value
    })
  }

  const dispatch= useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async () =>{
    try {
      const res= await API.post("/users/login", fromData);
      console.log(res);
      dispatch(loginSuccess(res.data.data))
      const useRole=res.data.data.role
      if(useRole=="admin"){
        navigate("/admin/dashboard")
      }else{
        navigate("/")
      }
      
    } catch (error) {
      console.log("something wrong while login",error);
      
    }
  }

  return (
    <div className='flex justify-center items-center mt-25 '>
      <div className=' w-80 md:w-100 lg:w-120 h-50 md:h-55  bg-white shadow-2xl flex flex-col p-2 md:p-3 lg:p-4 rounded-3xl '>
        <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Username/Email:</label>
        <input type="text" 
        className='border-2 m-1 rounded-md'
        name='username'
        value={fromData.username}
        onChange={handleChange}

         />
        <label htmlFor="password" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Password:</label>
        <input type="password" 
        className='border-2 m-1 rounded-md' 
        name='password'
        value={fromData.password}
        onChange={handleChange}
        />
        <div >
          <p className='text-[14px] md:text-[15px] font-semibold'>Profile Type:</p>
          <input type="radio"
             name='role' 
             value='user'
             checked={fromData.role === 'user'}
             onChange={handleChange}
           />
          <label htmlFor="" className='m-0.5 text-[13px] md:text-[14px]'>users</label>
          <input type="radio" 
            name='role' 
             value='admin'
             checked={fromData.role === 'admin'}
             onChange={handleChange}
          />
          <label htmlFor="" className='m-0.5 text-[13px] md:text-[14px]'>admin</label>
        </div>
        <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-40 rounded-lg' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login