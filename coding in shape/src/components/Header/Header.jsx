import logo from "../../assets/logos/logo.png";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link">
          <figure>
            <img src={logo} alt="logo coding in shape" />
          </figure>
          <h1 className="title">Coding in Shape</h1>
        </Link>

{/* -------------------------------------------------- */}
        <div className="navMenu">
          <ul>
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
        </div>
{/* -------------------------------------------------- */}

      </div>
    </header>
  );
}
