import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [id, setid] = useState("221000110057");
  const [password, setPassword] = useState("Shovan@2001");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const  API = import.meta.env.VITE_SERVER;

  useEffect(() => {
    if (user) {
      if(user.type === "admin"  || user.type === "superAdmin") {
        navigate("/admin/students");
      } else {
        navigate("/profile");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setError("Please enter both ID and password.");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        { id, password },
        { withCredentials: true }
      );

      // console.log("Login Success:", res.data);

      // Save user to context
      setUser(res.data.user);

      if(res.data.user.type === "admin") {
        navigate("/admin/students");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      setError("Invalid ID or password");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setid(e.target.value)}
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

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
