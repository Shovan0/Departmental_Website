import React, { useContext } from "react";

function Awards() {
  const awards = [
    {
      id: 1,
      faculty: "Dr. A. K. Sharma",
      award: "Best Researcher Award",
      issuer: "AICTE",
      year: "2024"
    },
    {
      id: 2,
      faculty: "Prof. R. Banerjee",
      award: "Excellence in Teaching Award",
      issuer: "State Government",
      year: "2023"
    }
  ];

  return (
    <div className="p-10 mt-24 bg-linear-to-b from-purple-50 to-white min-h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Faculty Awards & Achievements
      </h1>

      {/* TIMELINE */}
      <div className="relative border-l-4 border-purple-300 ml-5 space-y-10">

        {awards.map((a) => (
          <div key={a.id} className="ml-6 relative">

            {/* DOT */}
            <span className="absolute -left-7 top-2 h-5 w-5 bg-purple-500 rounded-full border-4 border-white shadow"></span>

            {/* CARD */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all border border-white">
              <h2 className="text-2xl font-semibold text-gray-800">{a.award}</h2>

              <p className="text-gray-700 mt-2">
                <strong className="text-purple-700">Recipient:</strong> {a.faculty}
              </p>

              <p className="text-gray-700">
                <strong className="text-purple-700">Issued By:</strong> {a.issuer}
              </p>

              <p className="text-gray-700">
                <strong className="text-purple-700">Year:</strong> {a.year}
              </p>

              {isAdmin && (
                <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Awards;
