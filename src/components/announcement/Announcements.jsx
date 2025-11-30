import React, { useRef } from "react";
import "./Announcements.css";
import { IoChevronBack, IoChevronForward, IoCalendarClear, IoArrowForward } from "react-icons/io5";

const announcementsData = [
  {
    id: 1,
    title: "New Semester Begins",
    date: "2025-12-01",
    description: "The new semester will start on December 1st.",
  },
  {
    id: 3,
    title: "Annual Sports Meet",
    date: "2025-12-10",
    description: "Register for the annual sports meet.",
  },
  {
    id: 2,
    title: "Guest Lecture on AI",
    date: "2025-11-05",
    description: "Guest lecture on AI applications in agriculture.",
  },
  {
    id: 4,
    title: "Hackathon Announcement",
    date: "2025-11-12",
    description: "24-hour hackathon coming soon!",
  },
  {
    id: 5,
    title: "Winter Festivals",
    date: "2025-11-12",
    description: "Taste the foods",
  },
  {
    id: 6,
    title: "Odd Semester",
    date: "2025-11-12",
    description: "Odd semester intended date is 02-01-2026",
  },
];

function Announcements() {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300;
  };

  const today = new Date();

  return (
    <section className="announcements">
      <h2 className="announcements-title">Announcements & Events</h2>

      <div className="slider-container">
        <button className="arrow left" onClick={slideLeft}>
          <IoChevronBack />
        </button>

        <div className="announcements-slider" ref={sliderRef}>
          {announcementsData.map((item) => {
            const eventDate = new Date(item.date);
            const isNew = eventDate >= today; // show NEW until event date

            return (
              <div className="announcement-card" key={item.id}>
                
                {isNew && <span className="card-badge">NEW</span>}

                <h3 className="announcement-title">{item.title}</h3>

                <span className="announcement-date">
                  <IoCalendarClear className="date-icon" />
                  {item.date}
                </span>

                <p className="announcement-desc">{item.description}</p>

                <button className="read-more-btn">
                  Read More <IoArrowForward className="arrow-icon" />
                </button>
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={slideRight}>
          <IoChevronForward />
        </button>
      </div>
    </section>
  );
}

export default Announcements;
