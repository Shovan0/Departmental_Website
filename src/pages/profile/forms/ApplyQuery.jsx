import React, { useState } from "react";

function ApplyQuery() {
  const [student] = useState({
    name: "Arij Chowdhury",
    roll: "2021CSE043",
  });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendQuery = () => {
    const data = {
      type: "General Query",
      student,
      subject,
      message,
    };

    console.log("Query Sent:", data);

    alert("Your query has been sent to the department.");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Submit a Query</h1>

      <label className="block mb-2 font-semibold">Query Subject</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Ex: Issue with attendance, Marks update…"
      />

      <label className="block mb-2 font-semibold">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Write your issue here..."
        rows="5"
      />

      <button
        onClick={sendQuery}
        className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
      >
        Send Query
      </button>
    </div>
  );
}

export default ApplyQuery;
