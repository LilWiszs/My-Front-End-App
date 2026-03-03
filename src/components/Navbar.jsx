import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({
  currentPage,
  currentUser,
  handleLogout
}) {
  const location = useLocation();
  
  // Helper to check if a path is active
  const isActive = (path) => {
    if (path === "dashboard" && (location.pathname === "/" || location.pathname === "/dashboard")) {
      return true;
    }
    return location.pathname === `/${path}`;
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        <Link 
          to="/dashboard"
          className={`nav-link ${isActive("dashboard") ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/patientMonitoring"
          className={`nav-link ${isActive("patientMonitoring") ? "active" : ""}`}
        >
          Patients
        </Link>
        <Link 
          to="/queueManagement"
          className={`nav-link ${isActive("queueManagement") ? "active" : ""}`}
        >
          Queue
        </Link>
        <Link 
          to="/reports"
          className={`nav-link ${isActive("reports") ? "active" : ""}`}
        >
          Reports
        </Link>
        <Link 
          to="/devices"
          className={`nav-link ${isActive("devices") ? "active" : ""}`}
        >
          Devices
        </Link>
        <Link 
          to="/users"
          className={`nav-link ${isActive("users") ? "active" : ""}`}
        >
          Users
        </Link>
        <Link 
          to="/settings"
          className={`nav-link ${isActive("settings") ? "active" : ""}`}
        >
          Settings
        </Link>
      </div>

      <div className="navbar-right">
        <div className="user-section">
          <span className="user-name">{currentUser?.name}</span>
          <span className="user-role">{currentUser?.role}</span>
        </div>
        <button 
          className="logout-btn-nav"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
