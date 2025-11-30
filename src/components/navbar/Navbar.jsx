import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.jpeg";
import { FiSearch } from "react-icons/fi"; // <- Import React icon

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Hamburger Icon (Left Side for Mobile) */}
        <div 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Logo (Left Side) */}
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Middle Navigation Links (Desktop) */}
        <ul className="nav-links-desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/department">Department</Link></li>
          <li><Link to="/faculty">Faculty</Link></li>
          {/* <li><Link to="/achievement">Achievements</Link></li> */}
          <li><Link to="/alumni">Alumni</Link></li>
        </ul>

        {/* Right Side Desktop Search Bar */}
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
          <FiSearch className="search-icon" />
        </div>

        {/* Mobile Menu */}
        <ul className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          </li>
          <li>
            <Link to="/faculty" onClick={() => setMenuOpen(false)}>Faculty</Link>
          </li>
          <li>
            <Link to="/achievement" onClick={() => setMenuOpen(false)}>Achievements</Link>
          </li>
          <li>
            <Link to="/alumni" onClick={() => setMenuOpen(false)}>Alumni</Link>
          </li>
          <li>
            <Link to="/department" onClick={() => setMenuOpen(false)}>Department</Link>
          </li>

          {/* Mobile Search */}
          <div className="nav-search-mobile">
            <input type="text" placeholder="Search..." />
            <FiSearch className="search-icon-mobile" />
          </div>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
