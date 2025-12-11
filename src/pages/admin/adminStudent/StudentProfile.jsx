import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StudentProfile.css";

export default function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState("");
    const API = import.meta.env.VITE_SERVER;

    useEffect(() => {
        axios
            .get(`${API}/api/admin/student/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setStudent(res.data.student)
                setImage(res.data.photo);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!student) return <p className="loading">Loading...</p>;

    // Update API handler
    const handleSave = () => {
        const regId = student.academic.registration;

        axios
            .put(
                `${API}/api/admin/student/${regId}`,
                student,
                { withCredentials: true }
            )
            .then(() => {
                alert("Student updated successfully");
                setIsEditing(false);
            })
            .catch((err) => console.error(err));
    };

    // Generic update function for all nested objects
    const updateField = (section, field, value, subField = null) => {
        setStudent((prev) => ({
            ...prev,
            [section]: subField
                ? {
                    ...prev[section],
                    [field]: {
                        ...prev[section][field],
                        [subField]: value,
                    },
                }
                : {
                    ...prev[section],
                    [field]: value,
                },
        }));
    };

    const { basic, academic, contact, address, guardian, previousMarks, photo } = student;

    return (
        <div className="profile-container">

            {/* Edit + Save Button */}
            <div className="top-actions">
                {!isEditing ? (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                )}
            </div>

            <div className="profile-header">
                <div className="avatar-wrapper">
                    <img
                        src={image}
                        alt={basic.name}
                        className="avatar-img"
                        onError={(e) => {
                            e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png"
                            console.log("Image not found ", image);
                        }}
                    />
                </div>


                <div>
                    {isEditing ? (
                        <input
                            className="input-edit"
                            value={basic.name}
                            onChange={(e) => updateField("basic", "name", e.target.value)}
                        />
                    ) : (
                        <h2>{basic.name}</h2>
                    )}

                    <p>
                        <strong>Department:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={academic.department}
                                onChange={(e) => updateField("academic", "department", e.target.value)}
                            />
                        ) : (
                            academic.department
                        )}
                    </p>
                </div>
            </div>

            <div className="profile-body">

                {/* Academic Section */}
                <section>
                    <h3>Academic Info</h3>

                    <p><strong>Roll:</strong> {academic.roll}</p>

                    <p><strong>Registration:</strong> {academic.registration}</p>

                    <p>
                        <strong>Stream:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={academic.stream}
                                onChange={(e) => updateField("academic", "stream", e.target.value)}
                            />
                        ) : (
                            academic.stream
                        )}
                    </p>

                    <p>
                        <strong>Year:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={academic.currentYear}
                                onChange={(e) => updateField("academic", "currentYear", e.target.value)}
                            />
                        ) : (
                            academic.currentYear
                        )}
                    </p>

                    <p>
                        <strong>Semester:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={academic.currentSemester}
                                onChange={(e) =>
                                    updateField("academic", "currentSemester", e.target.value)
                                }
                            />
                        ) : (
                            academic.currentSemester
                        )}
                    </p>

                    <p>
                        <strong>Section:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={academic.section}
                                onChange={(e) => updateField("academic", "section", e.target.value)}
                            />
                        ) : (
                            academic.section
                        )}
                    </p>
                </section>

                {/* Contact Info */}
                <section>
                    <h3>Contact Info</h3>

                    <p>
                        <strong>Email:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={contact.email}
                                onChange={(e) => updateField("contact", "email", e.target.value)}
                            />
                        ) : (
                            contact.email
                        )}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={contact.phone}
                                onChange={(e) => updateField("contact", "phone", e.target.value)}
                            />
                        ) : (
                            contact.phone
                        )}
                    </p>

                    <p>
                        <strong>Alternate:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={contact.alternatePhone}
                                onChange={(e) =>
                                    updateField("contact", "alternatePhone", e.target.value)
                                }
                            />
                        ) : (
                            contact.alternatePhone
                        )}
                    </p>
                </section>

                {/* Address */}
                <section>
                    <h3>Address</h3>

                    <p>
                        <strong>Present:</strong>{" "}
                        {isEditing ? (
                            <textarea
                                className="input-edit"
                                value={`${address.present.line1}, ${address.present.city}, ${address.present.state}, ${address.present.pin}`}
                                onChange={(e) =>
                                    updateField("address", "present", {
                                        ...address.present,
                                        line1: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            `${address.present.line1}, ${address.present.city}, ${address.present.state}, ${address.present.pin}`
                        )}
                    </p>

                    <p>
                        <strong>Permanent:</strong>{" "}
                        {isEditing ? (
                            <textarea
                                className="input-edit"
                                value={`${address.permanent.line1}, ${address.permanent.city}, ${address.permanent.state}, ${address.permanent.pin}`}
                                onChange={(e) =>
                                    updateField("address", "permanent", {
                                        ...address.permanent,
                                        line1: e.target.value,
                                    })
                                }
                            />
                        ) : (
                            `${address.permanent.line1}, ${address.permanent.city}, ${address.permanent.state}, ${address.permanent.pin}`
                        )}
                    </p>
                </section>

                {/* Guardian */}
                <section>
                    <h3>Guardian</h3>

                    <p>
                        <strong>Father:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={guardian.father.name}
                                onChange={(e) =>
                                    updateField("guardian", "father", e.target.value, "name")
                                }
                            />
                        ) : (
                            `${guardian.father.name} (${guardian.father.occupation}) - ${guardian.father.phone}`
                        )}
                    </p>

                    <p>
                        <strong>Mother:</strong>{" "}
                        {isEditing ? (
                            <input
                                className="input-edit"
                                value={guardian.mother.name}
                                onChange={(e) =>
                                    updateField("guardian", "mother", e.target.value, "name")
                                }
                            />
                        ) : (
                            `${guardian.mother.name} (${guardian.mother.occupation}) - ${guardian.mother.phone}`
                        )}
                    </p>
                </section>

                {/* Previous Marks */}
                <section>
                    <h3>Previous Marks</h3>
                    {previousMarks.map((pm) => (
                        <p key={pm._id}>
                            <strong>Semester {pm.semester}:</strong> SGPA {pm.sgpa} - {pm.result}
                        </p>
                    ))}
                </section>
            </div>
        </div>
    );
}
