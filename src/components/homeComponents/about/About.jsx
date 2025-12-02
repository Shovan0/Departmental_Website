import React from "react";
import "./About.css";
import aboutImg from "../../../assets/about_img.jpg";

function About() {
  return (
    <section id="About" className="about-section">
      <div className="about-text">
        <h2>About the Department</h2>

        <p>
          The Department of Information Technology is committed to providing 
          high-quality education and fostering research and innovation. Our 
          faculty members guide students through modern tools, hands-on learning, 
          and industry-ready skills.
        </p>

        <p>
          With well-equipped laboratories, collaborative learning spaces, and 
          active student communities, the department encourages creativity,
          problem-solving, and technical excellence.
        </p>
      </div>

      <div className="about-image">
        <img src={aboutImg} alt="Department" />
      </div>
    </section>
  );
}

export default About;
