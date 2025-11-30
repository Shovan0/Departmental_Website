import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------
// DEMO STUDENT DATABASE (Replace with real API)
// ---------------------------------------------------
const studentDB = {
  photo: "https://i.ibb.co/4pDNDk1/avatar.png",

  basic: {
    name: "Arij Chowdhury",
    gender: "Male",
    dob: "18 Oct 2003",
    bloodGroup: "B+",
  },

  academic: {
    roll: "23IT101",
    registration: "2023/IT/1299",
    stream: "B.Tech in Information Technology",
    department: "Information Technology",
    admissionYear: "2023",
    currentYear: "2nd Year",
    currentSemester: 3,
    section: "A",
  },

  contact: {
    email: "arij.student@college.edu",
    phone: "+91 9876543200",
    alternatePhone: "+91 9900099000",
  },

  address: {
    present: {
      line1: "45/B, Lake Road",
      city: "Kolkata",
      district: "Kolkata",
      state: "West Bengal",
      pin: "700029",
    },
    permanent: {
      line1: "Village Durgapur, Near Post Office",
      city: "Burdwan",
      district: "Bardhaman",
      state: "West Bengal",
      pin: "713101",
    },
  },

  guardian: {
    father: {
      name: "Mr. Pradip Chowdhury",
      phone: "+91 9870012300",
      occupation: "Businessman",
    },
    mother: {
      name: "Mrs. Ananya Chowdhury",
      phone: "+91 9000011122",
      occupation: "Teacher",
    },
  },
};

// ---------------------------------------------------
// EDIT PROFILE COMPONENT
// ---------------------------------------------------
const EditProfile = () => {
  const navigate = useNavigate();
  
  // Create local state for editing
  const [form, setForm] = useState({ ...studentDB });

  // Generic handler for nested objects
  const handleChange = (section, field, value, nested = null) => {
    if (nested) {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [nested]: {
            ...form[section][nested],
            [field]: value,
          },
        },
      });
    } else {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [field]: value,
        },
      });
    }
  };

  const handleSave = () => {
    // Here you would normally send 'form' to API
    console.log("Updated student data:", form);
    alert("Profile updated successfully!");
    navigate("/profile/details"); // Go back to details page
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Edit Student Profile
      </h1>

      {/* Basic Info */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={form.basic.name}
            onChange={(e) => handleChange("basic", "name", e.target.value)}
            placeholder="Full Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.basic.gender}
            onChange={(e) => handleChange("basic", "gender", e.target.value)}
            placeholder="Gender"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.basic.dob}
            onChange={(e) => handleChange("basic", "dob", e.target.value)}
            placeholder="Date of Birth"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.basic.bloodGroup}
            onChange={(e) =>
              handleChange("basic", "bloodGroup", e.target.value)
            }
            placeholder="Blood Group"
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* Academic Info */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Academic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={form.academic.stream}
            onChange={(e) => handleChange("academic", "stream", e.target.value)}
            placeholder="Program"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.academic.department}
            onChange={(e) =>
              handleChange("academic", "department", e.target.value)
            }
            placeholder="Department"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.academic.admissionYear}
            onChange={(e) =>
              handleChange("academic", "admissionYear", e.target.value)
            }
            placeholder="Admission Year"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.academic.currentYear}
            onChange={(e) =>
              handleChange("academic", "currentYear", e.target.value)
            }
            placeholder="Current Year"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={form.academic.currentSemester}
            onChange={(e) =>
              handleChange("academic", "currentSemester", e.target.value)
            }
            placeholder="Current Semester"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.academic.section}
            onChange={(e) => handleChange("academic", "section", e.target.value)}
            placeholder="Section"
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="email"
            value={form.contact.email}
            onChange={(e) => handleChange("contact", "email", e.target.value)}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.contact.phone}
            onChange={(e) => handleChange("contact", "phone", e.target.value)}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.contact.alternatePhone}
            onChange={(e) =>
              handleChange("contact", "alternatePhone", e.target.value)
            }
            placeholder="Alternate Phone"
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* Present Address */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Present Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={form.address.present.line1}
            onChange={(e) =>
              handleChange("address", "line1", e.target.value, "present")
            }
            placeholder="Line 1"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.address.present.city}
            onChange={(e) =>
              handleChange("address", "city", e.target.value, "present")
            }
            placeholder="City"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.address.present.district}
            onChange={(e) =>
              handleChange("address", "district", e.target.value, "present")
            }
            placeholder="District"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.address.present.state}
            onChange={(e) =>
              handleChange("address", "state", e.target.value, "present")
            }
            placeholder="State"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={form.address.present.pin}
            onChange={(e) =>
              handleChange("address", "pin", e.target.value, "present")
            }
            placeholder="PIN"
            className="border p-2 rounded"
          />
        </div>
      </section>

      {/* Guardian Info */}
      <section className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Guardian Information
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {/* Father */}
          <div>
            <input
              type="text"
              value={form.guardian.father.name}
              onChange={(e) =>
                handleChange("guardian", "name", e.target.value, "father")
              }
              placeholder="Father Name"
              className="border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={form.guardian.father.phone}
              onChange={(e) =>
                handleChange("guardian", "phone", e.target.value, "father")
              }
              placeholder="Father Phone"
              className="border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={form.guardian.father.occupation}
              onChange={(e) =>
                handleChange("guardian", "occupation", e.target.value, "father")
              }
              placeholder="Father Occupation"
              className="border p-2 rounded"
            />
          </div>

          {/* Mother */}
          <div>
            <input
              type="text"
              value={form.guardian.mother.name}
              onChange={(e) =>
                handleChange("guardian", "name", e.target.value, "mother")
              }
              placeholder="Mother Name"
              className="border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={form.guardian.mother.phone}
              onChange={(e) =>
                handleChange("guardian", "phone", e.target.value, "mother")
              }
              placeholder="Mother Phone"
              className="border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={form.guardian.mother.occupation}
              onChange={(e) =>
                handleChange("guardian", "occupation", e.target.value, "mother")
              }
              placeholder="Mother Occupation"
              className="border p-2 rounded"
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
            onClick={() => navigate("/profile/details")}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
