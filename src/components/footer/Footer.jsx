import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-brand">
          <h3>Information Technology</h3>
          <p>
            Dedicated to excellence in education and research, fostering a
            vibrant campus life and community.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>

          {/* Desktop Links */}
          <ul className="footer-links-desktop">
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/achievement">Achievements</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/department">Department</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>

          {/* Mobile Links */}
          <ul className="footer-links-mobile">
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/achievement">Achievements</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/department">Department</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Information Technology. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
