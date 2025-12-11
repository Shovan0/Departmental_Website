import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllStudents.css";

export default function AllStudents() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const API = import.meta.env.VITE_SERVER;

    useEffect(() => {
        axios
            .get(`${API}/api/admin/student`, {
                withCredentials: true,
            })
            .then((res) => {
                setStudents(res.data.students);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleUnderDev = () => {
        alert("Under development");
    };

    return (
        <div className="students-container">

            {/* YEAR BUTTONS */}
            <div className="buttons">
                <div className="year-buttons">
                    <button className="year-btn" onClick={handleUnderDev}>1st Year</button>
                    <button className="year-btn" onClick={handleUnderDev}>2nd Year</button>
                    <button className="year-btn" onClick={handleUnderDev}>3rd Year</button>

                    {/* ACTIVE BUTTON */}
                    <button className="year-btn active-year">4th Year</button>
                </div>

                <div>
                    <button className="edit-btn">Add Student</button>
                </div>
                
            </div>


            <div className="students-grid">
                {students.map((student) => (
                    <div
                        className="student-card"
                        key={student._id}
                        onClick={() => navigate(`/student/${student.academic.registration}`)}
                    >
                        <h3>{student.basic.name}</h3>
                        <p><strong>Department:</strong> {student.academic.department}</p>
                        <p><strong>Roll:</strong> {student.academic.roll}</p>
                        <p><strong>Registration:</strong> {student.academic.registration}</p>
                        <p><strong>Semester:</strong> {student.academic.currentSemester}</p>
                        <button className="view-btn">View</button>
                    </div>
                ))}
            </div>

        </div>
    );
}
