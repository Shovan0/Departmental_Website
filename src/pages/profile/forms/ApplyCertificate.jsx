import React, { useState } from "react";

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
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Request Certificate</h1>

      <label className="block mb-2 font-semibold">Select Certificate Type</label>
      <select
        value={certificateType}
        onChange={(e) => setCertificateType(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Choose Certificate</option>
        <option>Bonafide Certificate</option>
        <option>Character Certificate</option>
        <option>Internship Certificate</option>
        <option>Transfer Certificate</option>
      </select>

      <label className="block mb-2 font-semibold">Remarks (Optional)</label>
      <textarea
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Additional details…"
      />

      <button
        onClick={sendRequest}
        className="mt-5 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
      >
        Submit Request
      </button>
    </div>
  );
}

export default ApplyCertificate;
