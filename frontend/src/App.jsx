import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import API from "./api/api.js"
import { loginSuccess, logout } from "./features/auth/authSlice.js"


const dispatch= useDispatch()

useEffect(() => {
  const fetchUser= async () => {
    try {
      const res= await API.get("/users/getprofile")
      console.log(res);
      
      dispatch(loginSuccess())
    } catch (error) {
      dispatch(logout)
    }
  }

  fetchUser()
},[])



function App() {
  

  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default App
