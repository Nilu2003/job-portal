import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import API from "./api/api.js";
import { loginSuccess, logout } from "./features/auth/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/getprofile");

        if (res?.data?.data) {
          dispatch(loginSuccess(res.data.data));
        }
      } catch (error) {
        console.log("User not logged in"); // ❗ don't logout aggressively
        dispatch(logout());
      } finally {
        setLoading(false); // ✅ always stop loading
      }
    };

    fetchUser();
  }, [dispatch]);

  // ✅ prevent UI flicker / wrong logout
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;