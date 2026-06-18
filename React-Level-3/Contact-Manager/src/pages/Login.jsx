import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">👥</div>

        <h1>Contact Manager</h1>
        <p>Welcome back! </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="main-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="login-actions">
          <Link to="/forgot-password">🔐 Forgot Password?</Link>
          <Link to="/register">👤 Create Account</Link>
        </div>

        
      </div>
    </div>
  );
}

export default Login;