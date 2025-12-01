import React, { useState } from "react";
import "./ApplyCertificate.css";

function ApplyCertificate() {
  const [student] = useState({
    name: "Arij Chowdhury",
    roll: "2021CSE043",
  });

  const [certificateType, setCertificateType] = useState("");
  const [remarks, setRemarks] = useState("");

  const sendRequest = () => {
    const data = {
      type: "Certificate",
      certificateType,
      remarks,
      student,
    };

    console.log("Certificate Request Sent:", data);
    alert("Certificate request sent to HOD!");
  };

  return (
    <div className="cert-container">
      <div className="cert-card">

        <h1 className="cert-title">Request Certificate</h1>
        <p className="cert-subtitle">
          Submit the form below to request an official certificate.
        </p>

        {/* Student Details */}
        <div className="student-box">
          <h2 className="student-title">Student Details</h2>
          <div className="student-row">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.roll}</p>
          </div>
        </div>

        {/* Certificate Type */}
        <div className="cert-input-group">
          <label>
            Certificate Type <span className="required">*</span>
          </label>
          <select
            value={certificateType}
            onChange={(e) => setCertificateType(e.target.value)}
          >
            <option value="">Select Certificate</option>
            <option>Bonafide Certificate</option>
            <option>Character Certificate</option>
            <option>Internship Certificate</option>
            <option>Transfer Certificate</option>
          </select>
        </div>

        {/* Remarks */}
        <div className="cert-input-group">
          <label>Remarks (Optional)</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Write any additional information..."
          ></textarea>
        </div>

        {/* Submit */}
        <button className="cert-submit-btn" onClick={sendRequest}>
          Submit Request
        </button>

      </div>
    </div>
  );
}

export default ApplyCertificate;
