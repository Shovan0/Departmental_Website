import React, { useState } from "react";
import "./ApplyQuery.css";

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
    <div className="query-container">
      <div className="query-card">
        <h1 className="query-title">Submit a Query</h1>

        <div className="query-box">
          <label className="query-label">Query Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="query-input"
            placeholder="Ex: Issue with attendance, Marks update…"
          />

          <label className="query-label">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="query-textarea"
            placeholder="Write your issue here..."
          />

          <button className="query-btn" onClick={sendQuery}>
            Send Query
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyQuery;
