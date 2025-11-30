import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import HeroImage from "/src/assets/hero_image.jpg";

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Welcome to IT Department</h1>
        <p>Empowering Students Through Knowledge, Innovation, and Excellence</p>

        <a href="#About" className="hero-btn">
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
