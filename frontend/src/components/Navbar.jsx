import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">UrbexMania</span>
      </div>

      <div className="navbar-right">
        <Link to="/buildings" className="nav-link">
          Buildings
        </Link>

        {token && (
          <Link to="/favorites" className="nav-link">
            Favoris
          </Link>
        )}

        {!token && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}

        {token && (
          <button className="nav-button" onClick={logout}>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
}
