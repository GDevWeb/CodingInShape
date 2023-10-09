import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icons from "../../assets/icons/index_icons";
import "./navbar.scss";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={`nav${isActive ? " active" : ""}`}>
      <div className="nav__mobile">
        <div onClick={toggleNavbar} className="nav__toggler">
          <img
            src={isActive ? Icons.Close : Icons.Hamburger}
            alt="Toggle Icon"
          className="icon"/>
        </div>
        <Link to="/" className="nav__brand">
          Menu
        </Link>
      </div>
      <ul className={`nav__menu${isActive ? " nav__active" : ""}`}>
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Accueil
          </Link>
        </li>
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
        {isAdmin && (
          <li className="nav__item">
            <Link to="/dashboard" className="nav__link">
              DashBoard
            </Link>
          </li>
        )}

        {isAuthenticated &&
        <li className="nav__item">
          <a href="/exercise-page" className="nav__link">
            Mes exercices
          </a>
        </li>
        }
        <li className="nav__item">
          <Link to="/contact" className="nav__link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
