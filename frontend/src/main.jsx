import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import {Provider} from 'react-redux'
import {store} from "./app/store.js"
import ProtectRoute from './component/ProtectRoute.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminApplications from './pages/AdminApplications.jsx'
import JobDetails from './pages/JobDetails.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/jobs",
        element:<Jobs/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/profile",
        element:(
          <ProtectRoute>
            <Profile/>
          </ProtectRoute>
        )
      },
      {
        path:"/admin/dashboard",
        element:(
          <ProtectRoute>
            <AdminDashboard/>
          </ProtectRoute>
        )
      },
      {
        path:"/admin/applications",
        element:(
          <ProtectRoute>
            <AdminApplications/>
          </ProtectRoute>
        )
      },
      {
        path:"/job/:id",
        element:<JobDetails/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
