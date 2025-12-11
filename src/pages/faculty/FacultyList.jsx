import React, { useEffect, useState } from "react";
import "./Faculty.css"; // import CSS file

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_SERVER;

  const showAwardPopup = () => {
    alert("Awards section is under development.");
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`${API}/api/faculty`);
        const data = await res.json();

        if (data.success) {
          setFaculty(data.data);
        }
      } catch (error) {
        console.log("Error loading faculty:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="faculty-page">
      <h1 className="faculty-title">Our Faculty Members</h1>

      {loading && <p className="loading-text">Loading faculty...</p>}

      {!loading && (
        <div className="faculty-grid">
          {faculty.map((f) => (
            <div key={f._id} className="faculty-card">
              <div className="photo-wrapper">
                <img src={f.photo} alt={f.name} />
              </div>

              <h2 className="faculty-name">{f.name}</h2>
              <p className="faculty-position">{f.position}</p>
              <p className="faculty-email">{f.email}</p>

              <button onClick={showAwardPopup} className="award-btn">
                See Awards
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FacultyList;
