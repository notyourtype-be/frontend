import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"
const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
