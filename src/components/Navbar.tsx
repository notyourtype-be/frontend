import React from "react";
import "./Navbar.css";
import Logout from "../pages/Logout/Logout";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">🏠 PropertyApp</div>
      <div className="navbar-links">
        <button className="nav-btn" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-btn">Listings</button>
        <button className="nav-btn" onClick={() => navigate("/favourites")}>
          Favorites
        </button>
        <button className="nav-btn">Contact</button>
      </div>
      <Logout />
    </nav>
  );
};

export default Navbar;
