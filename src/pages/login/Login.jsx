import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");



  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }

    try {
        const res = await axios.get("http://localhost:5000/api/login", {
          username,
          password,
        });
    
        localStorage.setItem("token", res.data.token);
    
        navigate("/profile");
      } catch (error) {
        setError("Invalid username or password");
      }

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input password-input"
          />

          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "hide" : "show"}
          </span>
        </div>

        <p
          className="forgot-password"
          onClick={() => alert("Feature under processing...")}
        >
          Forgot Password?
        </p>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
