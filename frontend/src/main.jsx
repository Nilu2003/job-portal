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
import AdminAddJob from './pages/AdminAddJob.jsx'
import AdminEditJob from './pages/AdminEditJob.jsx'
import AdminApplicant from './pages/AdminApplicant.jsx'

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

            <Profile/>

        )
      },
      {
        path:"/admin/dashboard",
        element:(<AdminDashboard/>),

      },
      {
        path:"/admin/applications",
        element:(

            <AdminApplications/>

        )
      },
      {
        path:"/job/:id",
        element:<JobDetails/>
      },
      {
        path:"/admin/addjob",
        element:<AdminAddJob/>

      },
      {
        path:"/admin/edit-job/:id",
        element:<AdminEditJob/>
      },
      {
        path:"/admin/applicant/:id",
        element:<AdminApplicant/>
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
