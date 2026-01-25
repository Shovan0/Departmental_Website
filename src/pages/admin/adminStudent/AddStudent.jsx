import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_SERVER;

const AddStudent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        basic: {
            name: "",
            gender: "",
            dob: "",
            bloodGroup: "",
        },
        academic: {
            roll: "",
            registration: "",
            stream: "",
            department: "",
            admissionYear: "",
            currentYear: "",
            currentSemester: "",
            section: "",
        },
        contact: {
            email: "",
            phone: "",
            alternatePhone: "",
        },
        address: {
            present: {
                line1: "",
                city: "",
                district: "",
                state: "",
                pin: "",
            },
            permanent: {
                line1: "",
                city: "",
                district: "",
                state: "",
                pin: "",
            },
        },
        guardian: {
            father: { name: "", phone: "", occupation: "" },
            mother: { name: "", phone: "", occupation: "" },
        },
    });

    const handleChange = (path, value) => {
        setFormData((prev) => {
            const updated = { ...prev };
            let temp = updated;
            for (let i = 0; i < path.length - 1; i++) {
                temp = temp[path[i]];
            }
            temp[path[path.length - 1]] = value;
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Add student to students collection
            const studentRes = await axios.post(
                `${API}/api/admin/student`,
                formData,
                { withCredentials: true }
            );

            // 2️⃣ After student is added, create user login
            // await axios.post(
            //     `${API}/api/admin/create-user`,
            //     {
            //         studentId: formData.studentId,   // registration / roll number
            //         email: formData.email,
            //         password: formData.studentId,    // initial password strategy
            //     },
            //     { withCredentials: true }
            // );

            alert("Student and login created successfully");
            navigate("/admin/students");

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to add student");
        }
    };


    return (
        <div className="student-form-container">
            <h2>Add Student Profile</h2>

            <form className="student-form" onSubmit={handleSubmit}>
                {/* BASIC */}
                <section>
                    <h3>Basic Information</h3>
                    <input placeholder="Full Name" onChange={e => handleChange(["basic", "name"], e.target.value)} />
                    <select onChange={e => handleChange(["basic", "gender"], e.target.value)}>
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <input type="date" onChange={e => handleChange(["basic", "dob"], e.target.value)} />
                    <input placeholder="Blood Group" onChange={e => handleChange(["basic", "bloodGroup"], e.target.value)} />
                </section>

                {/* ACADEMIC */}
                <section>
                    <h3>Academic Information</h3>
                    <input placeholder="Roll Number" onChange={e => handleChange(["academic", "roll"], e.target.value)} />
                    <input placeholder="Registration Number" onChange={e => handleChange(["academic", "registration"], e.target.value)} />
                    <input placeholder="Stream" onChange={e => handleChange(["academic", "stream"], e.target.value)} />
                    <input placeholder="Department" onChange={e => handleChange(["academic", "department"], e.target.value)} />
                    <input placeholder="Admission Year" onChange={e => handleChange(["academic", "admissionYear"], e.target.value)} />
                    <input placeholder="Current Year" onChange={e => handleChange(["academic", "currentYear"], e.target.value)} />
                    <input type="number" placeholder="Current Semester" onChange={e => handleChange(["academic", "currentSemester"], Number(e.target.value))} />
                    <input placeholder="Section" onChange={e => handleChange(["academic", "section"], e.target.value)} />
                </section>

                {/* CONTACT */}
                <section>
                    <h3>Contact Details</h3>
                    <input placeholder="Email" onChange={e => handleChange(["contact", "email"], e.target.value)} />
                    <input placeholder="Phone" onChange={e => handleChange(["contact", "phone"], e.target.value)} />
                    <input placeholder="Alternate Phone" onChange={e => handleChange(["contact", "alternatePhone"], e.target.value)} />
                </section>

                {/* ADDRESS */}
                <section>
                    <h3>Present Address</h3>
                    <input placeholder="Address Line" onChange={e => handleChange(["address", "present", "line1"], e.target.value)} />
                    <input placeholder="City" onChange={e => handleChange(["address", "present", "city"], e.target.value)} />
                    <input placeholder="District" onChange={e => handleChange(["address", "present", "district"], e.target.value)} />
                    <input placeholder="State" onChange={e => handleChange(["address", "present", "state"], e.target.value)} />
                    <input placeholder="PIN Code" onChange={e => handleChange(["address", "present", "pin"], e.target.value)} />
                </section>

                {/* GUARDIAN */}
                <section>
                    <h3>Guardian Details</h3>
                    <input placeholder="Father Name" onChange={e => handleChange(["guardian", "father", "name"], e.target.value)} />
                    <input placeholder="Father Phone" onChange={e => handleChange(["guardian", "father", "phone"], e.target.value)} />
                    <input placeholder="Father Occupation" onChange={e => handleChange(["guardian", "father", "occupation"], e.target.value)} />

                    <input placeholder="Mother Name" onChange={e => handleChange(["guardian", "mother", "name"], e.target.value)} />
                    <input placeholder="Mother Phone" onChange={e => handleChange(["guardian", "mother", "phone"], e.target.value)} />
                    <input placeholder="Mother Occupation" onChange={e => handleChange(["guardian", "mother", "occupation"], e.target.value)} />
                </section>

                <button type="submit">Create Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
