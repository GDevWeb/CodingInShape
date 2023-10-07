import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogButton from "../LogButton/LogButton"
import "./navbar.scss";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleNavbar = () => {
    setIsActive(!isActive);
    setIsToggled(!isToggled);
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav__brand">
        Coding In Shape
      </Link>
      <ul className={`nav__menu${isActive ? " nav__active" : ""}`}>
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Accueil
          </Link>
        </li>

        {/* Si non authentifié, affiche Inscription */}
        {!isAuthenticated && (
          <li className="nav__item">
            <Link to="/signup" className="nav__link">
              Inscription
            </Link>
          </li>
        )}

        <li className="nav__item">
          <Link to="/myaccount" className="nav__link">
            Mon compte
          </Link>
        </li>

        {/* Si admin, affiche Dashboard */}
        {isAdmin && (
          <li className="nav__item">
            <Link to="/dashboard" className="nav__link">
              DashBoard
            </Link>
          </li>
        )}

        <li className="nav__item">
          <a href="/exercises" className="nav__link">
            Mes exercices
          </a>
        </li>
        <li className="nav__item">
          <Link to="/contact" className="nav__link">
            Contact
          </Link>
        </li>
      </ul>
      <div
        onClick={toggleNavbar}
        className={`nav__toggler${isToggled ? " toggle" : ""}`}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <LogButton/>
    </nav>
  );
}
