import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import { updatejob } from "../features/jobs/jobSlice";



const AdminEditJob = () => {
    const { id } = useParams();
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        companyName: "",
        Jobtype: "",
        location: "",
        position: "",
        experienceYear: "",
        salary: ""
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await API.get(`/jobs/getjob/${id}`);
                console.log(res);
                
                setFormData(res.data.data);
            } catch (error) {
                console.log("error fetching job", error);
            }
        };

        fetchJob();
    }, [id]);


    const handleChage = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {


        try {
            const res = await API.patch(`/jobs/updatejob/${id}`, formData);

            dispatch(updatejob(res.data.data)); 

            alert("Job updated ✅");
            navigate("/admin/dashboard");

        } catch (error) {
            console.log("update error", error);
        }
    };

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

                <div className='flex flex-row gap-3 items-center'>
                    <button className='border w-20 md:w-25 relative left-15 md:left-30 lg:left-30 rounded-lg mt-8 bg-blue-500'
                        onClick={handleUpdate}>Update Job</button>
                    <button className='border w-20 md:w-25 relative left-25 md:left-30 lg:left-35 rounded-lg mt-8 bg-red-600'
                        onClick={() => navigate("/admin/dashboard")}>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default AdminEditJob