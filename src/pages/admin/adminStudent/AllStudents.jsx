import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllStudents.css";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [activeYear, setActiveYear] = useState(4);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_SERVER;

  useEffect(() => {
    axios
      .get(`${API}/api/admin/student`, { withCredentials: true })
      .then((res) => setStudents(res.data.students))
      .catch((err) => console.error(err));
  }, []);

  const yearSemesterMap = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8],
  };

  const filteredStudents = students.filter((student) =>
    yearSemesterMap[activeYear].includes(student.academic.currentSemester)
  );

  const handleDelete = async (e, registration, name) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/api/admin/student/${registration}`,
        { withCredentials: true }
      );

      setStudents((prev) =>
        prev.filter(
          (s) => s.academic.registration !== registration
        )
      );
    } catch (error) {
      alert("Failed to delete student");
    }
  };


  return (
    <div className="students-container">

      {/* YEAR BUTTONS */}
      <div className="buttons">
        <div className="year-buttons">
          {[1, 2, 3, 4].map((year) => (
            <button
              key={year}
              className={`year-btn ${activeYear === year ? "active-year" : ""}`}
              onClick={() => setActiveYear(year)}
            >
              Year {year}
            </button>
          ))}
        </div>

        <button
          className="edit-btn"
          onClick={() => navigate("/admin/add-student")}
        >
          Add Student
        </button>
      </div>

      {/* STUDENT CARDS */}
      <div className="students-grid">
        {filteredStudents.length === 0 ? (
          <p className="no-data">No students found</p>
        ) : (
          filteredStudents.map((student) => (
            <div
              className="student-card"
              key={student._id}
              onClick={() =>
                navigate(`/student/${student.academic.registration}`)
              }
            >
              {/* DELETE BUTTON */}
              <button
                className="delete-btn"
                onClick={(e) =>
                  handleDelete(
                    e,
                    student.academic.registration,
                    student.basic.name
                  )
                }
              >
                ×
              </button>
              <h3>{student.basic.name}</h3>
              <p><strong>Department:</strong> {student.academic.department}</p>
              <p><strong>Roll:</strong> {student.academic.roll}</p>
              <p><strong>Registration:</strong> {student.academic.registration}</p>
              <p><strong>Semester:</strong> {student.academic.currentSemester}</p>

              <button className="view-btn">View</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
