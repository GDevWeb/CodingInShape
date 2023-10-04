import { useState } from "react";
import { useSelector } from "react-redux";
import hamburger from "../../assets/icons/hamburger.svg";
import close from "../../assets/icons/close.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const isAdmin = useSelector((state) => state.auth.isAdmin);

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
          <Link to="/signup" className="logo-link">
            Inscription
          </Link>
        </li>

        <li>
          <Link to="/myaccount" className="logo-link">
            Mon compte
          </Link>
        </li>

        <li>
          <Link to="/exercises" className="logo-link">
            Mes exercices
          </Link>
        </li>

        {isAdmin && (
          <li>
            <Link to="/dashboard" className="logo-link">
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link to="/contact" className="logo-link">
            Contact
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

/*📖Simple composant navBar contenant les links vers différentes pages📖*/
