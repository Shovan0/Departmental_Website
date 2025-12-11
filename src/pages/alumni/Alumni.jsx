import React, { useEffect, useState } from "react";
import AlumniCard from "../../components/alumni/AlumniCard.jsx";
import "./Alumni.css";

export default function Alumni() {
  const [alumniData, setAlumniData] = useState([]);
  const API = import.meta.env.VITE_SERVER;

  useEffect(() => {
    fetch(`${API}/api/alumni`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlumniData(data.data); // FIX: Access data.data
        }
      })
      .catch((err) => {
        console.error("Error fetching alumni data:", err);
      });
  }, []);

  return (
    <div className="alumni-page">
      <div className="alumni-header">
        <h1 className="alumni-title">Our Distinguished Alumni</h1>
        <p className="alumni-subtitle">
          Meet the proud graduates who are making remarkable impacts in industries worldwide.
        </p>
      </div>

      <div className="alumni-grid">
        {alumniData.map((alum) => (
          <AlumniCard
            key={alum._id}
            name={alum.name}
            photo={alum.profilePhoto}
            department={alum.department}
            batch={alum.batch}
            position={alum.currentPosition}
          />
        ))}
      </div>
    </div>
  );
}
