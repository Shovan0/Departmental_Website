import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo.jpeg";
import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_SERVER;

  const handleLogout = async () => {
    try {
      await axios.get(`${API}/api/auth/logout`, { withCredentials: true });
      navigate("/");
      setUser(null);
    } catch (error) {
      alert("Logout failed. Please try again.");
      console.log("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Mobile Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links-desktop">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/department">Department</Link></li>
          <li><Link to="/faculty">Faculty</Link></li>
          <li><Link to="/alumni">Alumni</Link></li>
        </ul>

        {/* Desktop Right Section */}
        <div className="nav-right">
          {user ? (
            <>
              {/* <Link to="/profile" className="nav-avatar">
                <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="avatar" />
              </Link> */}
              <div>
                {
                  user.type === "admin" || user.type === "superAdmin" ? (
                    <Link to="/admin/students">
                      All Students
                    </Link>
                  ) : (
                    <Link to="/profile" className="nav-avatar">
                      <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="avatar" />
                    </Link>
                  )
                }
              </div>
              <Link onClick={() => handleLogout()} className="logout-btn">
                Logout
              </Link>
            </>

          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>

        {/* ------------------ MOBILE MENU ------------------ */}
        <ul className={`nav-links-mobile ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/faculty" onClick={() => setMenuOpen(false)}>Faculty</Link>
          </li>
          <li>
            <Link to="/alumni" onClick={() => setMenuOpen(false)}>Alumni</Link>
          </li>
          <li>
            <Link to="/department" onClick={() => setMenuOpen(false)}>Department</Link>
          </li>

          {/* Conditional Login / Profile (Mobile) */}
          {user ? (
            <li>
              <Link to="/profile" className="nav-avatar">
                <img
                  src="https://i.ibb.co/4pDNDk1/avatar.png"
                  alt="avatar"
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}

          {/* Optional Search */}
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
