const EditProfileModal = ({ user, setUser, setShowModal }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.put("/users/updateprofile", formData);
      setUser(res.data.data); // 🔥 instant update UI
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/40 backdrop-blur-sm">

      <div className="bg-white p-6 rounded-xl shadow-xl w-96">

        <h2 className="text-lg font-bold mb-3">Edit Profile</h2>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
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