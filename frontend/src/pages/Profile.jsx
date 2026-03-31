import React, { useEffect, useState } from "react";
import API from "../api/api";
import EditProfileModal from "../component/EditProfileModal"
import { useSelector } from "react-redux";
import avatar from "../assets/blank-profile-picture.webp"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { role } = useSelector((state) => state.auth);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/users/getprofile");
      setUser(res.data.data);
    };

    const fetchAppliedJobs = async () => {
      const res = await API.get("/applications/applied-job");
      setAppliedJobs(res.data.data);
    };

    fetchProfile();
    fetchAppliedJobs();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">

      
      <div className="bg-white shadow-xl rounded-xl p-6 flex justify-between items-start">

        <div className="flex gap-5">
          <img
            src={user.avatar || avatar}
            className="w-20 h-20 rounded-full"
          />

          <div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">{user.bio}</p>

            <p className="mt-2">📧 {user.email}</p>
            <p>📞 {user.phoneNumber}</p>

            {/* skills */}
            <div className="mt-2 flex gap-2 flex-wrap">
              {user.skill?.map((skill, i) => (
                <span key={i} className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>

            {/* resume */}
            <div className="mt-2">
              <a href={user.resume} target="_blank" className="text-blue-500 underline">
                View Resume
              </a>
            </div>
          </div>
        </div>

        {/* ✏️ EDIT BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="border px-3 py-1 rounded"
        >
          ✏️
        </button>
      </div>

      {/* 🔥 APPLIED JOBS */}
      {role == "user" &&
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Applied Jobs</h2>

          <table className="w-full  shadow">
            <thead className="bg-gray-200">
              <tr>
                <th>Date</th>
                <th>Job Role</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appliedJobs.map((job) => (
                <tr key={job._id} className="text-center">
                  <td   >{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td  >{job.title}</td>
                  <td  >{job.companyName}</td>

                  {/* ✅ STATUS BADGE */}
                  <td >
                    <span className={`py-1 px-1 rounded text-white text-[10px] 
                    ${job.status === "accepted" && "bg-green-500"}
                    ${job.status === "rejected" && "bg-red-500"}
                    ${job.status === "pending" && "bg-gray-500"}
                  `}>
                      {job.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      {/* 🔥 EDIT MODAL */}
      {showModal && (
        <EditProfileModal user={user} setUser={setUser} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Profile;