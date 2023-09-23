import { Link } from "react-router-dom"; 
import "./Card.scss";

export default function Card({ title, content, link, textLink, userData }) {
  return (
    <div className="cardContainer">
      <h2 className="card-header">{title}</h2>
      <p className="card-content">{content}</p>
      <div className="card-link">
        <Link to={link} className="linkTo">{textLink || "cliquez ici"}</Link>
      </div>
      {userData}
    </div>
  );
}
