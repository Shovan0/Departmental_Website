import React, { useState } from "react";
import "./ApplyNOC.css";

function ApplyNOC() {
  const [student] = useState({
    name: "Arij Chowdhury",
    roll: "2021CSE043",
    department: "Computer Science & Engineering",
    semester: "5th",
  });

  const [purpose, setPurpose] = useState("");

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
    <div className="noc-container">
      <div className="noc-card">
        <h1 className="noc-title">Apply for NOC</h1>

        <div className="noc-letter-box">
          <p>To,</p>
          <p>Head of Department</p>
          <p>{student.department}</p>

          <p className="noc-gap"><b>Subject:</b> Request for No Objection Certificate</p>

          <p>Respected Sir/Madam,</p>

          <p className="noc-text">
            I, <b>{student.name}</b> (Roll No: <b>{student.roll}</b>), studying in the
            <b> {student.semester}</b> semester of <b>{student.department}</b>,
            would like to request a No Objection Certificate for the following purpose:
          </p>

          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Enter purpose (Internship, Training, Passport, etc.)"
            className="noc-input"
          />

          <p className="noc-gap">Kindly approve my request.</p>

          <p>Thanking you,</p>
          <p><b>{student.name}</b></p>
          <p>Roll No: {student.roll}</p>
        </div>

        <button className="noc-btn" onClick={sendNOC}>
          Send to HOD
        </button>
      </div>
    </div>
  );
}

export default ApplyNOC;
