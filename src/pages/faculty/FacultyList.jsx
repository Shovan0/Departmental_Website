import React, { useEffect, useState, useContext } from "react";
import "./Faculty.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function FacultyList() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    position: "",
    email: "",
  });

  const API = import.meta.env.VITE_SERVER;

  const isAdmin =
    user?.type === "admin" || user?.type === "superAdmin";

  /* ---------------- FETCH FACULTY ---------------- */
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const url = isAdmin
          ? `${API}/api/admin/faculty`
          : `${API}/api/faculty`;

        const res = await axios.get(url, {
          withCredentials: true,
        });

        if (res.data.success) {
          setFaculty(res.data.data);
        }
      } catch (error) {
        console.error("Error loading faculty:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchFaculty();
  }, [authLoading, isAdmin, API]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?"))
      return;

    if (
      !window.confirm(
        "This action is permanent. Do you really want to continue?"
      )
    )
      return;

    try {
      const res = await axios.delete(
        `${API}/api/admin/faculty/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setFaculty((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (error) {
      alert("Failed to delete faculty");
      console.error(error);
    }
  };

  /* ---------------- EDIT START ---------------- */
  const startEdit = (faculty) => {
    setEditId(faculty._id);
    setEditData({
      name: faculty.name,
      position: faculty.position,
      email: faculty.email,
    });
  };

  /* ---------------- SAVE EDIT ---------------- */
  const saveEdit = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to save these changes?"
      )
    )
      return;

    try {
      const res = await axios.put(
        `${API}/api/admin/faculty/${id}`,
        editData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setFaculty((prev) =>
          prev.map((f) =>
            f._id === id ? res.data.data : f
          )
        );
        setEditId(null);
      }
    } catch (error) {
      alert("Failed to update faculty");
      console.error(error);
    }
  };

  if (authLoading || loading) {
    return <p className="loading-text">Loading faculty...</p>;
  }

  return (
    <div className="faculty-page">
      <h1 className="faculty-title">Our Faculty Members</h1>

      <div className="faculty-grid">
        {faculty.map((f) => (
          <div key={f._id} className="faculty-card">
            {/* Delete */}
            {isAdmin && (
              <button
                className="delete-icon-btn"
                onClick={() => handleDelete(f._id)}
                title="Delete Faculty"
              >
                ✕
              </button>
            )}

            <div className="photo-wrapper">
              <img src={f.photo} alt={f.name} />
            </div>

            {/* NAME */}
            {editId === f._id ? (
              <input
                className="edit-input"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
              />
            ) : (
              <h2 className="faculty-name">{f.name}</h2>
            )}

            {/* POSITION */}
            {editId === f._id ? (
              <input
                className="edit-input"
                value={editData.position}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    position: e.target.value,
                  })
                }
              />
            ) : (
              <p className="faculty-position">{f.position}</p>
            )}

            {/* EMAIL */}
            {editId === f._id ? (
              <input
                className="edit-input"
                value={editData.email}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              <p className="faculty-email">{f.email}</p>
            )}

            {/* ACTION BUTTONS */}
            {isAdmin && editId !== f._id && (
              <button
                className="edit-small-btn"
                onClick={() => startEdit(f)}
              >
                Edit
              </button>
            )}

            {isAdmin && editId === f._id && (
              <button
                className="save-btn"
                onClick={() => saveEdit(f._id)}
              >
                Save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyList;
