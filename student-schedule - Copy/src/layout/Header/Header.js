import React from "react";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaUsers, FaClock, FaCalendarAlt } from "react-icons/fa";
import "./Header.css"; 

function Header() {
  return (
    <nav className="header-nav">
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9Qh2rJaKcHthgCzbqkeZ2GWJJmcT2M4oXA&s" alt="Logo" />
      </div>
      <ul className="header-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChalkboardTeacher className="menu-icon" /> Class
          </NavLink>
        </li>
        <li>
          <NavLink to="/student" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUserGraduate className="menu-icon" /> Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentclass" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUsers className="menu-icon" /> Student Class
          </NavLink>
        </li>
        <li>
          <NavLink to="/classschedule" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaClock className="menu-icon" /> Class Schedule
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaCalendarAlt className="menu-icon" /> Schedule
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
