import React from "react";
import { useNavigate } from "react-router-dom";
/* ---------------------------------------------------
   DEMO STUDENT DATABASE (Replace with real API)
----------------------------------------------------*/

const studentDB = {
  photo: "https://i.ibb.co/4pDNDk1/avatar.png",

  basic: {
    name: "Arij Chowdhury",
    gender: "Male",
    dob: "18 Oct 2003",
    bloodGroup: "B+",
  },

  academic: {
    roll: "23IT101",
    registration: "2023/IT/1299",
    stream: "B.Tech in Information Technology",
    department: "Information Technology",
    admissionYear: "2023",
    currentYear: "2nd Year",
    currentSemester: 3,
    section: "A",
  },

  contact: {
    email: "arij.student@college.edu",
    phone: "+91 9876543200",
    alternatePhone: "+91 9900099000",
  },

  address: {
    present: {
      line1: "45/B, Lake Road",
      city: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      pin: "700029",
    },
    permanent: {
      line1: "Village Durgapur, Near Post Office",
      city: "Burdwan",
      district: "Bardhaman",
      state: "West Bengal",
      pin: "713101",
    },
  },

  guardian: {
    father: {
      name: "Mr. Pradip Chowdhury",
      phone: "+91 9870012300",
      occupation: "Businessman",
    },
    mother: {
      name: "Mrs. Ananya Chowdhury",
      phone: "+91 9000011122",
      occupation: "Teacher",
    },
  },

  previousMarks: [
    { semester: 1, sgpa: 8.6, result: "Passed" },
    { semester: 2, sgpa: 8.9, result: "Passed" },
  ],

  certificates: [
    { name: "NOC for Internship", date: "12 Jan 2025", file: "#" },
    { name: "Bonafide Certificate", date: "10 Dec 2024", file: "#" },
    { name: "Character Certificate", date: "05 July 2024", file: "#" },
  ],
};

/* ---------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------*/

const Details = () => {
  const s = studentDB;
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Student Profile Details
      </h1>

      {/* Profile Header */}
      <div className="bg-white shadow-lg p-5 rounded-lg flex gap-6 mb-6">

        {/* Photo */}
        <img
          src={s.photo}
          alt="Student Photo"
          className="w-32 h-32 rounded-lg border object-cover"
        />

        {/* Basic Info */}
        <div>
          <p className="text-xl font-semibold text-gray-800">{s.basic.name}</p>
          <p className="text-gray-600">Roll: {s.academic.roll}</p>
          <p className="text-gray-600">Reg No: {s.academic.registration}</p>
          <p className="text-gray-600">Dept: {s.academic.department}</p>

          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/profile/editProfile")}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* BASIC DETAILS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
          <p><span className="font-semibold">Full Name:</span> {s.basic.name}</p>
          <p><span className="font-semibold">Gender:</span> {s.basic.gender}</p>
          <p><span className="font-semibold">Date of Birth:</span> {s.basic.dob}</p>
          <p><span className="font-semibold">Blood Group:</span> {s.basic.bloodGroup}</p>
        </div>
      </section>

      {/* ACADEMIC DETAILS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Academic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
          <p><span className="font-semibold">Program:</span> {s.academic.stream}</p>
          <p><span className="font-semibold">Department:</span> {s.academic.department}</p>
          <p><span className="font-semibold">Admission Year:</span> {s.academic.admissionYear}</p>
          <p><span className="font-semibold">Current Year:</span> {s.academic.currentYear}</p>
          <p><span className="font-semibold">Current Sem:</span> {s.academic.currentSemester}</p>
          <p><span className="font-semibold">Section:</span> {s.academic.section}</p>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Contact Information
        </h2>

        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {s.contact.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {s.contact.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Alternate Phone:</span> {s.contact.alternatePhone}
        </p>
      </section>

      {/* ADDRESS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Address</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Present Address */}
          <div>
            <h3 className="font-semibold mb-1">Present Address</h3>
            <p className="text-gray-700">{s.address.present.line1}</p>
            <p className="text-gray-700">
              {s.address.present.city}, {s.address.present.district}
            </p>
            <p className="text-gray-700">
              {s.address.present.state} - {s.address.present.pin}
            </p>
          </div>

          {/* Permanent */}
          <div>
            <h3 className="font-semibold mb-1">Permanent Address</h3>
            <p className="text-gray-700">{s.address.permanent.line1}</p>
            <p className="text-gray-700">
              {s.address.permanent.city}, {s.address.permanent.district}
            </p>
            <p className="text-gray-700">
              {s.address.permanent.state} - {s.address.permanent.pin}
            </p>
          </div>
        </div>
      </section>

      {/* GUARDIAN DETAILS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Guardian Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Father</h3>
            <p className="text-gray-700">{s.guardian.father.name}</p>
            <p className="text-gray-700">{s.guardian.father.phone}</p>
            <p className="text-gray-700">{s.guardian.father.occupation}</p>
          </div>

          <div>
            <h3 className="font-semibold">Mother</h3>
            <p className="text-gray-700">{s.guardian.mother.name}</p>
            <p className="text-gray-700">{s.guardian.mother.phone}</p>
            <p className="text-gray-700">{s.guardian.mother.occupation}</p>
          </div>
        </div>
      </section>

      {/* PREVIOUS SEMESTER MARKS */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Previous Semester Results
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Semester</th>
              <th className="p-2 border">SGPA</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {s.previousMarks.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{m.semester}</td>
                <td className="p-2 border">{m.sgpa}</td>
                <td className="p-2 border">{m.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CERTIFICATES */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Certificates Issued
        </h2>

        <ul className="space-y-3">
          {s.certificates.map((c, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-gray-50 p-3 rounded border"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-gray-600 text-sm">Issued: {c.date}</p>
              </div>

              <a
                href={c.file}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Details;
