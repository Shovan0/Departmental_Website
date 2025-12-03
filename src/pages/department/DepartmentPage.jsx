import React, { useEffect, useState } from "react";
import "./DepartmentPage.css";

const DepartmentPage = () => {
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    // ---------- STATIC MOCK DATA ----------
    const data = {
      "department": {
        "placement": {
          "lastYear": "2024-25",
          "totalPlaced": 125,
          "topCompanies": [
            "Infosys",
            "TCS",
            "Wipro",
            "Cognizant",
            "Capgemini",
            "HCL Technologies",
            "Accenture",
            "Tech Mahindra",
            "Deloitte"
          ],
          "highestPackage": "30 LPA",
          "averagePackage": "6.5 LPA",
          "reportLink": "/assets/placement-report-2024.pdf"
        },

        "timetable": [
          {
            "year": "First Year",
            "table": [
              ["Mon", "9:00-10:00", "Mathematics"],
              ["Mon", "10:00-11:00", "Programming Fundamentals"],
              ["Tue", "9:00-10:00", "Physics"],
              ["Tue", "11:00-12:00", "English Communication"],
              ["Wed", "10:00-11:00", "Chemistry"],
              ["Thu", "1:00-2:00", "Basic Electronics"],
              ["Fri", "11:00-12:00", "Environmental Science"]
            ]
          },
          {
            "year": "Second Year",
            "table": [
              ["Mon", "10:00-11:00", "Data Structures"],
              ["Tue", "9:00-10:00", "Digital Logic"],
              ["Wed", "12:00-1:00", "Discrete Mathematics"],
              ["Thu", "1:00-2:00", "Computer Architecture"],
              ["Fri", "10:00-11:00", "DBMS"]
            ]
          }
        ],

        "holidays": [
          {
            "date": "2025-12-06",
            "name": "Holiday",
            "noticeLink": "/assets/notices/holiday.pdf"
          },
          {
            "date": "2025-12-25",
            "name": "Christmas",
            "noticeLink": "/assets/notices/christmas.pdf"
          },
          {
            "date": "2026-01-01",
            "name": "New Year",
            "noticeLink": ""
          }
        ],

        "fees": [
          { "head": "Tuition Fee (per semester)", "amount": "₹20,000" },
          { "head": "Laboratory Fee", "amount": "₹5,000" },
          { "head": "Library Fee", "amount": "₹2,000" },
          { "head": "Exam Fee", "amount": "₹1,500" }
        ],

        "syllabus": [
          { "title": "First Year Syllabus", "link": "/assets/syllabus/first-year.pdf" },
          { "title": "Second Year Syllabus", "link": "/assets/syllabus/second-year.pdf" },
          { "title": "Final Year Syllabus", "link": "/assets/syllabus/final-year.pdf" }
        ]
      }
    };

    // Extract REAL department object
    setDepartment(data.department);
  }, []);

  if (!department) return <p className="loading-text">Loading Department...</p>;

  return (
    <div className="department-page">

      <h1 className="dept-title">Computer Science Department</h1>
      <p className="dept-description">
        Explore syllabus, timetable, fee structure, holidays and placements.
      </p>

      {/* ---------- Syllabus ---------- */}
      <section className="card-section">
        <h2>Syllabus</h2>
        <div className="card-grid" onClick={()=> alert("under development")}>
          {department.syllabus.map((item, index) => (
            <a key={index} href={"#"} className="card syllabus-card">
              <h3>{item.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Timetable ---------- */}
      <section className="card-section">
        <h2>Timetable</h2>

        <div className="timetable-container">
          {department.timetable.map((entry, index) => (
            <div key={index} className="timetable-card">
              <h3>{entry.year}</h3>

              <table>
                <tbody>
                  {entry.table.map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Fees ---------- */}
      <section className="card-section">
        <h2>Fee Structure</h2>
        <div className="fee-list">
          {department.fees.map((fee, index) => (
            <div key={index} className="fee-item">
              <span>{fee.head}</span>
              <strong>{fee.amount}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Holidays ---------- */}
      <section className="card-section">
        <h2>Holiday List</h2>
        <ul className="holiday-list">
          {department.holidays.map((holiday, index) => (
            <li key={index}>
              <strong>{holiday.name}</strong> — {holiday.date}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Placements ---------- */}
      <section className="card-section">
        <h2>Top Recruiters</h2>
        <ul className="placement-list">
          {department.placement.topCompanies.map((company, index) => (
            <li key={index}>{company}</li>
          ))}
        </ul>

        <p><strong>Highest Package:</strong> {department.placement.highestPackage}</p>
        <p><strong>Average Package:</strong> {department.placement.averagePackage}</p>
      </section>

    </div>
  );
};

export default DepartmentPage;
