import { Link } from "react-router-dom";
import "./Register.css";

function ForgotPassword() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Forgot Password</h1>

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Enter your email to reset your password
        </p>

        <input type="email" placeholder="Enter your email address" />

        <button onClick={() => alert("Password reset link sent successfully!")}>
          Send Reset Link
        </button>

        <p>
          Back to <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;