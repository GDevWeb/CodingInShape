import logo from "../../assets/logos/logo-white.png";
import { Link } from "react-router-dom";
import "./header.scss";

// import LogButton from '../LogButton/LogButton';
export default function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link">
          <figure>
            <img src={logo} alt="logo coding in shape" />
          </figure>
        </Link>
      </div>
      <div className="header_title">
        <h1>coding in shape</h1>
      </div>
    </header>
  );
}
