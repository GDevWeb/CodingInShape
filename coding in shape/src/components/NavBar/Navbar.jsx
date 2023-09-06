import { useState } from "react";
import hamburger from "../../assets/icons/hamburger.svg";
import close from "../../assets/icons/close.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? "show-menu" : ""}`}>
      <ul>

        <li>
        <Link to="/" className="logo-link">
          Accueil 
        </Link>
        </li>

        <li>
        <Link to="/account" className="logo-link">
          <a href="#">Mon compte</a>
          </Link>
        </li>

        <li>
        <Link to="/register" className="logo-link">
          <a href="#">Inscription</a>
          </Link>
        </li>

        <li>
        <Link to="/contact" className="logo-link">
          <a href="#">Contact</a>
          </Link>
        </li>
      </ul>
      <button onClick={toggleMenu}>
        <img
          className="w-6"
          src={showMenu ? close : hamburger}
          alt={showMenu ? "Cacher le menu" : "Montrer le menu"}
        />
      </button>
    </nav>
  );
}