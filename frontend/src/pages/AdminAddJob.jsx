
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../api/api'
import { addJob } from '../features/jobs/jobSlice'

const AdminAddJob = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        companyName: "",
        Jobtype: "",
        location: "",
        position: "",
        experienceYear: "",
        salary: ""
    })

    const [logo, setLogo] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChage =  (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async () => {
        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key])
            })

            if (logo) {
                data.append("logo", logo)
            }

            const res= await API.post("/jobs/registerjob",data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            dispatch(addJob(res.data.data))
            alert("job created sucessfully")
            setLogo(null)
            navigate("/admin/dashboard")


        }

        catch (error) {
            console.log("something error while job created",error);
        }
    }
         
         

        return (
            <div className='flex justify-center items-center mt-5 '>
                <div className=' w-80 md:w-100 lg:w-120 h-150 md:h-155 lg:h-150 bg-white shadow-2xl flex flex-col p-2 md:p-3 lg:p-4 rounded-3xl '>
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Title:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name="title"
                        value={formData.title}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Description:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='description'
                        value={formData.description}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Company Name:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='companyName'
                        value={formData.companyName}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Job Type:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='Jobtype'
                        value={formData.Jobtype}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>location:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='location'
                        value={formData.location}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Position:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='position'
                        value={formData.position}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Experience Year:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='experienceYear'
                        value={formData.experienceYear}
                        onChange={handleChage}
                    />
                    <label htmlFor="username" className='text-[10px] md:text-[13px] lg:text-[15px] font-semibold'>Salary:</label>
                    <input type="text"
                        className='border-2 m-1 rounded-md'
                        name='salary'
                        value={formData.salary}
                        onChange={handleChage}
                    />
                    <input
                        type="file"
                        id="logoUpload"
                        className="hidden"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />

                    <label
                        htmlFor="logoUpload"
                        className="block w-1/3 text-center bg-blue-500 text-white py-2 rounded cursor-pointer hover:bg-blue-600"
                    >
                        Choose Logo
                    </label>

                    {logo && (
                            <p className="">
                                {logo.name}
                            </p>
                        )}

                    <div className='flex flex-row gap-3 items-center'>
                        <button className='border w-20 md:w-25 relative left-15 md:left-30 lg:left-30 rounded-lg mt-8 bg-blue-500'
                        onClick={handleSubmit}>Create Job</button>
                        <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-35 rounded-lg mt-8 bg-red-600'
                        onClick={() => navigate("/admin/dashboard")}>Cancel</button>
                    </div>

                </div>
            </div>
        )
    }


    export default AdminAddJob