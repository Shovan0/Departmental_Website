import React from "react";


//    DEMO DATABASE (Replace with API later)

const demoDB = {
  departmentName: "Information Technology Department",

  currentSemester: 3,

  // THEORY SUBJECTS FOR CURRENT SEM
  theorySubjects: [
    {
      subject: "Data Structures",
      faculty: "Dr. Rina Mukherjee",
      phone: "+91 9876512340",
      credits: 4,
      hours: "4 hrs/week",
    },
    {
      subject: "Computer Networks",
      faculty: "Prof. Sayan Chakraborty",
      phone: "+91 9830011122",
      credits: 3,
      hours: "3 hrs/week",
    },
    {
      subject: "Discrete Mathematics",
      faculty: "Dr. Abhijit Saha",
      phone: "+91 9903312340",
      credits: 4,
      hours: "4 hrs/week",
    },
    {
      subject: "Database Management Systems",
      faculty: "Dr. Anirban Sen",
      phone: "+91 7988899007",
      credits: 3,
      hours: "3 hrs/week",
    },
  ],

  // LAB SUBJECTS
  labSubjects: [
    {
      subject: "DSA Lab",
      faculty: "Mr. Rajesh Mondal",
      phone: "+91 9087654321",
      credits: 1,
      hours: "2 hrs/week",
    },
    {
      subject: "Computer Networks Lab",
      faculty: "Mr. Koushik Das",
      phone: "+91 9907654321",
      credits: 1,
      hours: "2 hrs/week",
    },
    {
      subject: "DBMS Lab",
      faculty: "Ms. Priya Roy",
      phone: "+91 8877009988",
      credits: 1,
      hours: "2 hrs/week",
    },
  ],

  // FACILITIES
  facilities: [
    "Fully air-conditioned computer labs",
    "High-speed internet access",
    "Smart classrooms",
    "Research & Innovation Centre",
    "Library with e-journal access",
    "Project-based learning classrooms",
  ],

  // RESEARCH PROJECTS
  researchProjects: [
    "IoT-Based Smart Agriculture",
    "AI-Driven Facial Recognition",
    "Cybersecurity Threat Detection",
    "Cloud-Native App Architecture",
  ],

  // STUDY MATERIALS LINKS
  materials: [
    { name: "DSA Notes", link: "#" },
    { name: "CN Lecture PDFs", link: "#" },
    { name: "DBMS Question Bank", link: "#" },
  ],

  // MENTOR – STUDENT LIST
  mentors: [
    { mentor: "Prof. Rina Mukherjee", students: 18 },
    { mentor: "Prof. Anirban Sen", students: 20 },
    { mentor: "Mr. Sayan Chakraborty", students: 15 },
  ],

  // PLACEMENT OFFICER
  placementOfficer: {
    name: "Mr. Arghya Banerjee",
    phone: "+91 9812312341",
    email: "arghya.placement@college.edu",
  },
};

/* ---------------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------------*/

const Department = () => {
  const d = demoDB;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        {d.departmentName}
      </h1>

      {/* CURRENT SEMESTER */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md mb-6">
        <p className="text-lg font-semibold text-blue-800">
          📘 Current Semester: {d.currentSemester}
        </p>
      </div>

      {/* THEORY SUBJECTS */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">
          📚 Theory Subjects
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Faculty</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Credits</th>
              <th className="p-2 border">Hours</th>
            </tr>
          </thead>

          <tbody>
            {d.theorySubjects.map((sub, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{sub.subject}</td>
                <td className="p-2 border">{sub.faculty}</td>
                <td className="p-2 border">{sub.phone}</td>
                <td className="p-2 border">{sub.credits}</td>
                <td className="p-2 border">{sub.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LAB SUBJECTS */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">🧪 Lab Subjects</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Lab</th>
              <th className="p-2 border">Faculty</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Credits</th>
              <th className="p-2 border">Hours</th>
            </tr>
          </thead>

          <tbody>
            {d.labSubjects.map((lab, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{lab.subject}</td>
                <td className="p-2 border">{lab.faculty}</td>
                <td className="p-2 border">{lab.phone}</td>
                <td className="p-2 border">{lab.credits}</td>
                <td className="p-2 border">{lab.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* FACILITIES */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">🏫 Facilities</h2>
        <ul className="list-disc ml-6 text-gray-700">
          {d.facilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* RESEARCH PROJECTS */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">
          🔬 Research & Projects
        </h2>
        <ul className="list-disc ml-6 text-gray-700">
          {d.researchProjects.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      {/* MATERIALS */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">📁 Study Materials</h2>
        <ul className="list-disc ml-6 text-blue-600">
          {d.materials.map((m, i) => (
            <li key={i}>
              <a href={m.link} className="hover:underline">
                {m.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* MENTORS */}
      <section className="bg-white shadow-lg rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">👨‍🏫 Mentor – Mentee</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Mentor Name</th>
              <th className="p-2 border">Students Assigned</th>
            </tr>
          </thead>
          <tbody>
            {d.mentors.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{m.mentor}</td>
                <td className="p-2 border">{m.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* PLACEMENT OFFICER */}
      <section className="bg-blue-50 border rounded-lg p-5 shadow">
        <h2 className="text-xl font-bold mb-3 text-gray-800">💼 Placement Officer</h2>

        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {d.placementOfficer.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone:</span> {d.placementOfficer.phone}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {d.placementOfficer.email}
        </p>
      </section>
    </div>
  );
};

export default Department;
