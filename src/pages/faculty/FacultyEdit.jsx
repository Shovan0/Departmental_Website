import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

function FacultyEdit() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // Demo: fake database
  const facultyDB = [
    {
      id: "1",
      name: "Dr. A. K. Sharma",
      designation: "Professor & HOD",
      email: "aksharma@college.edu",
      photo: "https://via.placeholder.com/200",
    },
    {
      id: "2",
      name: "Prof. R. Banerjee",
      designation: "Associate Professor",
      email: "rbanerjee@college.edu",
      photo: "https://via.placeholder.com/200",
    }
  ];

  const facultyData = facultyDB.find((f) => f.id === id);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    photo: "",
  });

  // Load existing faculty data
  useEffect(() => {
    if (facultyData) {
      setForm(facultyData);
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="mt-28 text-center text-2xl font-semibold text-red-600">
        Access Denied — Admin Only
      </div>
    );
  }

  // Preview new image
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      photo: URL.createObjectURL(file),
    });
  };

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Faculty profile updated successfully! (Demo)");
    navigate("/faculty/list");
  };

  return (
    <div className="p-10 mt-24 min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex justify-center">

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md shadow-xl border border-white/40 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Faculty Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PHOTO PREVIEW */}
          <div className="flex flex-col items-center">
            <img
              src={form.photo}
              alt="faculty"
              className="w-32 h-32 rounded-full shadow-md object-cover border-4 border-white"
            />

            <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
              Change Photo
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none shadow-sm"
              required
            />
          </div>

          {/* DESIGNATION */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Designation
            </label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none shadow-sm"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none shadow-sm"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate("/faculty/list")}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl text-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default FacultyEdit;
