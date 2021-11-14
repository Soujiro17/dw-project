import React from "react";
import "./DashboardAsideNav.scss";
import { Link } from "react-router-dom";
import { icons } from "../../consts/icons";

const DashboardAsideNav = () => {
  return (
    <aside className="aside-nav">
      <nav className="nav-user">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/dashboard">
              <div className="icon">{icons.dashboard}</div>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/solicitudes">
              <div className="icon">{icons.certificado}</div>
              Solicitudes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/solicitar-retiro">
              <div className="icon">{icons.solicitarRetiro}</div>
              Solicitar retiro
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardAsideNav;
