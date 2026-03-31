import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

const AdminApplicant = () => {
    const { id } = useParams(); // jobId
    const [data, setData] = useState([]);




    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await API.get(`/applications/response-list-application/${id}`);
                // console.log(res);

                setData(res.data.data);
            } catch (error) {
                console.log("Error fetching applicants", error);
            }
        };

        fetchApplicants();
    }, [id]);


    const handleStatusChange = async (id, status) => {
        try {
            const res = await API.post(`/applications/give-respone-application/${id}`, {
                status
            });

            // console.log("updated", res.data);

            // update UI instantly
            setData((prev) =>
                prev.map((app) =>
                    app._id === id ? { ...app, status } : app
                )
            );

        } catch (error) {
            console.log("error updating status", error);
        }
    };


    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">
                Applicants ({data.length})
            </h2>

            <table className="w-full border shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((app) => (
                        <tr key={app._id} className="text-center border-t">

                            <td>{app.fullName}</td>
                            <td>{app.email}</td>
                            <td>{app.phoneNumber}</td>

                            <td>
                                <a
                                    href={app.resume}
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    View Resume
                                </a>
                            </td>

                            <td>
                                {new Date(app.createdAt).toLocaleDateString()}
                            </td>

                            <td>
                                <select
                                    value={app.status}
                                    onChange={(e) =>
                                        handleStatusChange(app._id, e.target.value)
                                    }
                                    className="border p-1 rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminApplicant;


