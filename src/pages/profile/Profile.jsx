import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

const DetailsWithQuery = () => {
  const navigate = useNavigate();
  const [studentDB, setStudentDB] = useState(null);
  const API_URI = import.meta.env.API_URI;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await fetch(`${API_URI}/profile/221000110057`);
        const response = await fetch("http://localhost:5000/api/profile/221000110057");
        const data = await response.json();
        setStudentDB(data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!studentDB) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const s = studentDB;

  return (
    <div className="container">
      <h1 className="page-title">Student Profile Details</h1>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <img src={s.photo} alt="Student" className="profile-photo" />

        <div>
          <p className="profile-name">{s.basic.name}</p>
          <p className="profile-line">Roll: {s.academic.roll}</p>
          <p className="profile-line">Reg No: {s.academic.registration}</p>
          <p className="profile-line">Dept: {s.academic.department}</p>

          <button className="edit-btn" onClick={() => navigate("/profile/editProfile")}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <section className="card">
        <h2 className="section-title">Personal Information</h2>

        <div className="grid-2">
          <p><strong>Full Name:</strong> {s.basic.name}</p>
          <p><strong>Gender:</strong> {s.basic.gender}</p>
          <p><strong>Date of Birth:</strong> {s.basic.dob}</p>
          <p><strong>Blood Group:</strong> {s.basic.bloodGroup}</p>
        </div>
      </section>

      {/* ACADEMIC */}
      <section className="card">
        <h2 className="section-title">Academic Information</h2>

        <div className="grid-2">
          <p><strong>Program:</strong> {s.academic.stream}</p>
          <p><strong>Department:</strong> {s.academic.department}</p>
          <p><strong>Admission Year:</strong> {s.academic.admissionYear}</p>
          <p><strong>Current Year:</strong> {s.academic.currentYear}</p>
          <p><strong>Current Sem:</strong> {s.academic.currentSemester}</p>
          <p><strong>Section:</strong> {s.academic.section}</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="card">
        <h2 className="section-title">Contact Information</h2>
        <p><strong>Email:</strong> {s.contact.email}</p>
        <p><strong>Phone:</strong> {s.contact.phone}</p>
        <p><strong>Alternate Phone:</strong> {s.contact.alternatePhone}</p>
      </section>

      {/* ADDRESS */}
      <section className="card">
        <h2 className="section-title">Address</h2>

        <div className="grid-2">
          <div>
            <h3 className="sub-heading">Present Address</h3>
            <p>{s.address.present.line1}</p>
            <p>{s.address.present.city}, {s.address.present.district}</p>
            <p>{s.address.present.state} - {s.address.present.pin}</p>
          </div>

          <div>
            <h3 className="sub-heading">Permanent Address</h3>
            <p>{s.address.permanent.line1}</p>
            <p>{s.address.permanent.city}, {s.address.permanent.district}</p>
            <p>{s.address.permanent.state} - {s.address.permanent.pin}</p>
          </div>
        </div>
      </section>

      {/* GUARDIAN */}
      <section className="card">
        <h2 className="section-title">Guardian Information</h2>

        <div className="grid-2">
          <div>
            <h3 className="sub-heading">Father</h3>
            <p>{s.guardian.father.name}</p>
            <p>{s.guardian.father.phone}</p>
            <p>{s.guardian.father.occupation}</p>
          </div>

          <div>
            <h3 className="sub-heading">Mother</h3>
            <p>{s.guardian.mother.name}</p>
            <p>{s.guardian.mother.phone}</p>
            <p>{s.guardian.mother.occupation}</p>
          </div>
        </div>
      </section>

      {/* PREVIOUS MARKS */}
      <section className="card">
        <h2 className="section-title">Previous Semester Results</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Semester</th>
              <th>SGPA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {s.previousMarks.map((m, i) => (
              <tr key={i}>
                <td>{m.semester}</td>
                <td>{m.sgpa}</td>
                <td>{m.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CERTIFICATES */}
      {/* <section className="card">
        <h2 className="section-title">Certificates Issued</h2>

        <ul className="cert-list">
          {s.certificates.map((c, i) => (
            <li key={i} className="cert-item">
              <div>
                <p className="cert-name">{c.name}</p>
                <p className="cert-date">Issued: {c.date}</p>
              </div>

              <a href={c.file} className="download-btn">Download</a>
            </li>
          ))}
        </ul>
      </section> */}

      {/* QUERY ADDRESSAL */}
      <h2 className="query-title">Query Addressal</h2>

      <div className="query-grid">
        <Link to="/profile/applyNOC" className="query-card">
          <span>Apply for NOC</span>
          <span className="arrow">&rarr;</span>
        </Link>

        <Link to="/profile/applyCertificate" className="query-card">
          <span>Request a Certificate</span>
          <span className="arrow">&rarr;</span>
        </Link>

        <Link to="/profile/applyQuery" className="query-card">
          <span>Submit General Query</span>
          <span className="arrow">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default DetailsWithQuery;
