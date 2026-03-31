import { useState, useEffect } from "react"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/getprofile")
        dispatch(loginSuccess(res.data.data))
      } catch (error) {
        dispatch(logout())
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}