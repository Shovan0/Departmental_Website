import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Alumni.css";
import { AuthContext } from "../../context/AuthContext";

export default function Alumni() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const API = import.meta.env.VITE_SERVER;

  const isSuperAdmin = user?.type === "superAdmin";

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    department: "",
    batch: "",
    currentPosition: "",
    profilePhoto: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlumni, setNewAlumni] = useState({
    name: "",
    department: "",
    batch: "",
    currentPosition: "",
    profilePhoto: "",
  });

  /* ================= FETCH ALUMNI (PUBLIC) ================= */
  useEffect(() => {
    axios
      .get(`${API}/api/alumni`) // ✅ PUBLIC ROUTE
      .then((res) => {
        if (res.data.success) {
          setAlumniData(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching alumni:", err))
      .finally(() => setLoading(false));
  }, [API]);

  /* ================= DELETE (SUPERADMIN ONLY) ================= */
  const handleDelete = async (id) => {
    if (!isSuperAdmin) return;

    if (!window.confirm("Delete this alumni permanently?")) return;

    try {
      const res = await axios.delete(
        `${API}/api/admin/alumni/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAlumniData((prev) =>
          prev.filter((a) => a._id !== id)
        );
      }
    } catch {
      alert("Failed to delete alumni");
    }
  };

  /* ================= EDIT ================= */
  const startEdit = (alum) => {
    if (!isSuperAdmin) return;

    setEditId(alum._id);
    setEditData({
      name: alum.name,
      department: alum.department,
      batch: alum.batch,
      currentPosition: alum.currentPosition,
      profilePhoto: alum.profilePhoto,
    });
  };

  const saveEdit = async (id) => {
    if (!window.confirm("Save changes?")) return;

    try {
      const res = await axios.put(
        `${API}/api/admin/alumni/${id}`,
        editData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAlumniData((prev) =>
          prev.map((a) =>
            a._id === id ? res.data.data : a
          )
        );
        setEditId(null);
      }
    } catch {
      alert("Update failed");
    }
  };

  /* ================= ADD ================= */
  const handleAddAlumni = async () => {
    if (!window.confirm("Add this alumni?")) return;

    try {
      const res = await axios.post(
        `${API}/api/admin/alumni`,
        newAlumni,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAlumniData((prev) => [
          res.data.data,
          ...prev,
        ]);
        setShowAddModal(false);
        setNewAlumni({
          name: "",
          department: "",
          batch: "",
          currentPosition: "",
          profilePhoto: "",
        });
      }
    } catch {
      alert("Failed to add alumni");
    }
  };

  /* ================= LOADING ================= */
  if (loading || authLoading) {
    return <p className="loading-text">Loading alumni...</p>;
  }

  return (
    <div className="alumni-page">
      {/* ================= HEADER ================= */}
      <div className="alumni-header">
        <h1 className="alumni-title">Our Alumni</h1>
        <p className="alumni-subtitle">
          Distinguished alumni of our institution
        </p>

        {isSuperAdmin && (
          <button
            className="add-alumni-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add Alumni
          </button>
        )}
      </div>

      {/* ================= GRID ================= */}
      <div className="alumni-grid">
        {alumniData.map((alum) => (
          <div key={alum._id} className="alumni-card">
            {isSuperAdmin && (
              <button
                className="delete-icon-btn"
                onClick={() => handleDelete(alum._id)}
              >
                ✕
              </button>
            )}

            <img
              src={alum.profilePhoto}
              alt={alum.name}
              className="alumni-photo"
            />

            {editId === alum._id ? (
              <>
                <input
                  className="edit-input"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <input
                  className="edit-input"
                  value={editData.department}
                  onChange={(e) =>
                    setEditData({ ...editData, department: e.target.value })
                  }
                />
                <input
                  className="edit-input"
                  value={editData.batch}
                  onChange={(e) =>
                    setEditData({ ...editData, batch: e.target.value })
                  }
                />
                <input
                  className="edit-input"
                  value={editData.currentPosition}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      currentPosition: e.target.value,
                    })
                  }
                />

                <button
                  className="save-btn"
                  onClick={() => saveEdit(alum._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{alum.name}</h3>
                <p>{alum.department}</p>
                <p>Batch: {alum.batch}</p>
                <p>{alum.currentPosition}</p>

                {isSuperAdmin && (
                  <button
                    className="edit-small-btn"
                    onClick={() => startEdit(alum)}
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= ADD MODAL ================= */}
      {showAddModal && isSuperAdmin && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Alumni</h2>

            {Object.keys(newAlumni).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={newAlumni[key]}
                onChange={(e) =>
                  setNewAlumni({
                    ...newAlumni,
                    [key]: e.target.value,
                  })
                }
              />
            ))}

            <div className="modal-actions">
              <button onClick={handleAddAlumni}>Add</button>
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
