import React, { useState } from 'react'
import API from "../api/api.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../features/auth/authSlice'

const Login = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError("") // clear error when typing
  }

  const handleSubmit = async () => {

    const { username, password, role } = formData

    
    if (!username || !password || !role) {
      return setError("All fields are required ❗")
    }

    try {
      setLoading(true)
      setError("")

      const res = await API.post("/users/login", formData)


      dispatch(loginSuccess(res.data.data))

      const useRole = res.data.data.role


      if (useRole === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/")
      }

    } catch (error) {
      console.log("error--",error);
      console.log("error response data msg-",error.response.data);
      
      
      //  Backend error handling
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials ❌")
      } else {
        setError("Server not responding ❌")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center mt-25 '>

      <div className='w-80 md:w-100 lg:w-120 bg-white shadow-2xl flex flex-col p-4 rounded-3xl'>

        <h2 className="text-center text-lg font-bold mb-3">Login</h2>

        
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <label>Username/Email:</label>
        <input
          type="text"
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <label>Password:</label>
        <input
          type="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='border-2 m-1 rounded-md p-1'
        />

        <div className='mt-2'>
          <p className='font-semibold'>Profile Type:</p>

          <input
            type="radio"
            name='role'
            value='user'
            checked={formData.role === 'user'}
            onChange={handleChange}
          />
          <span className='mr-3'>User</span>

          <input
            type="radio"
            name='role'
            value='admin'
            checked={formData.role === 'admin'}
            onChange={handleChange}
          />
          <span>Admin</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 p-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  )
}

export default Login