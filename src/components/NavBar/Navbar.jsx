import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/index_icons";
import "./navbar.scss";
import LogButton from "../LogButton/LogButton"

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const closeNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`nav${isActive ? " active" : ""}`}>
      <div className="nav__mobile">
        <div onClick={toggleNavbar} className="nav__toggler">
          <img
            src={isActive ? Icons.Close : Icons.Hamburger}
            alt="Toggle Icon"
            className="icon"
          />
        </div>
        <LogButton/>
      </div>
      <ul className={`nav__menu${isActive ? " nav__active" : ""}`}>
        <li className="nav__item">
          <Link
            to="/"
            className="nav__link"
            onClick={closeNavbar}
            aria-label="Accueil"
          >
            Accueil
          </Link>
        </li>
        {!isAuthenticated && (
          <li className="nav__item">
            <Link
              to="/signup"
              className="nav__link"
              onClick={closeNavbar}
              aria-label="Inscription"
            >
              Inscription
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav__item">
            <Link
              to="/myaccount"
              className="nav__link"
              onClick={closeNavbar}
              aria-label="Mon compte"
            >
              Mon compte
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="nav__item">
            <Link
              to="/dashboard"
              className="nav__link"
              onClick={closeNavbar}
              aria-label="Dashboard"
            >
              DashBoard
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li className="nav__item">
            <a
              href="/exercises-list"
              className="nav__link"
              onClick={closeNavbar}
              aria-label="Mes exercices"
            >
              Mes exercices
            </a>
          </li>
        )}
        <li className="nav__item">
          <Link
            to="/contact"
            className="nav__link"
            onClick={closeNavbar}
            aria-label="Contact"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
