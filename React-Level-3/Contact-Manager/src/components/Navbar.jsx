import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="dashboard-nav">
      <div>
        <h1>👥 Contact Manager</h1>
        <p>{user?.email}</p>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;