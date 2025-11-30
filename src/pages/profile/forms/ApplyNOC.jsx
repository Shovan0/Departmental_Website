import React, { useState } from "react";

function ApplyNOC() {
  const [student] = useState({
    name: "Arij Chowdhury",
    roll: "2021CSE043",
    department: "Computer Science & Engineering",
    semester: "5th",
  });

  const [purpose, setPurpose] = useState("");

  // Backend Placeholder
  const sendNOC = () => {
    const requestData = {
      type: "NOC",
      student,
      purpose,
    };

    console.log("NOC Request Sent:", requestData);

    alert("NOC request sent to HOD successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Apply for NOC</h1>

      <div className="bg-gray-50 p-4 rounded shadow leading-7">
        <p>To,</p>
        <p>Head of Department</p>
        <p>{student.department}</p>

        <br />

        <p><b>Subject:</b> Request for No Objection Certificate</p>

        <br />

        <p>Respected Sir/Madam,</p>

        <p className="mt-3">
          I, <b>{student.name}</b> (Roll No: <b>{student.roll}</b>), studying in the
          <b> {student.semester}</b> semester of <b>{student.department}</b>,
          would like to request a No Objection Certificate for the following purpose:
        </p>

        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Enter purpose (Internship, Training, Passport, etc.)"
          className="w-full border mt-3 p-2 rounded"
          required
        />

        <p className="mt-3">Kindly approve my request.</p>

        <br />
        <p>Thanking you,</p>
        <p><b>{student.name}</b></p>
        <p>Roll No: {student.roll}</p>
      </div>

      <button
        onClick={sendNOC}
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Send to HOD
      </button>
    </div>
  );
}

export default ApplyNOC;
