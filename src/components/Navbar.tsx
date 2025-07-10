import React from "react";
import "./Navbar.css";
import Logout from "../pages/Logout/Logout"


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🏠 PropertyApp</div>
      <div className="navbar-links">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Listings</button>
        <button className="nav-btn">Favorites</button>
        <button className="nav-btn">Contact</button>
      </div>
    <Logout></Logout>
    </nav>
  );
};

export default Navbar;
