import { useState } from "react";
import API from "../api/api";

const EditProfileModal = ({ user, setUser, setShowModal }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    bio: user.bio || "",
    phoneNumber: user.phoneNumber || "",
    email:user.email || "",
    password: "" ,   //  NEW
    skill: user.skill ? user.skill.join(",") : ""  
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      // console.log(formData);
      
      //  remove empty password
      const payload = { ...formData };

      if (!payload.password) {
        delete payload.password;
      }

      const res = await API.patch("/users/updateprofile", payload);
      // console.log(res);
      

      setUser(res.data.data); // update UI
      setShowModal(false);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/40 backdrop-blur-sm">

      <div className="bg-white p-6 rounded-xl shadow-xl w-96">

        <h2 className="text-lg font-bold mb-3">Edit Profile</h2>

        <p>Full name:</p>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <p>Bio:</p>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <p>Phone Number:</p>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />
        
        <p>Email:</p>
        <input
          type="text"
          name="fullName"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />


        {/*  PASSWORD FIELD */}
        <p>New Password (optional):</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave empty if no change"
          className="border w-full p-2 mb-2"
        />
        <p>Skills (comma separated):</p>
        <input
          type="text"
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="border w-full p-2 mb-2"
        />

        <div className="flex justify-between mt-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Update
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="border px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;