import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function FacultyList() {
  const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

  const faculty = [
    {
      id: 1,
      name: "Dr. A. K. Sharma",
      designation: "Professor & HOD",
      email: "aksharma@college.edu",
      photo: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Prof. R. Banerjee",
      designation: "Associate Professor",
      email: "rbanerjee@college.edu",
      photo: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Ms. Priya Das",
      designation: "Assistant Professor",
      email: "priyadas@college.edu",
      photo: "https://via.placeholder.com/200",
    }
  ];

  return (
    <div className="p-10 mt-24 bg-linear-to-b from-blue-50 to-white min-h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Our Faculty Members
      </h1>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {faculty.map((f) => (
          <div
            key={f.id}
            className="backdrop-blur-md bg-white/70 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-7 flex flex-col items-center text-center"
          >
            {/* PHOTO */}
            <div className="w-36 h-36 rounded-full overflow-hidden shadow-md border-4 border-white">
              <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
            </div>

            {/* TEXT INFO */}
            <h2 className="mt-5 text-2xl font-bold text-gray-800">{f.name}</h2>
            <p className="text-gray-600 text-md">{f.designation}</p>

            <p className="mt-3 text-blue-700 font-medium">{f.email}</p>

            {/* EDIT BUTTON FOR ADMIN ONLY */}
            {isAdmin && (
                <button
                  onClick={() => navigate(`/faculty/edit/${f.id}`)}
                  className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Edit
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyList;
