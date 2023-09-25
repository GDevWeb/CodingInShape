import { Link } from "react-router-dom"; 
import "./Card.scss";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export default function Card({ title, content, link, textLink, userData }) {

  const truncatedContent = truncateText(content, 300);
  
  return (
    <div className="cardContainer">
      <h2 className="card-header">{title}</h2>
      <p className="card-content">{truncatedContent}</p>
      <div className="card-link">
        <Link to={link} className="linkTo">{textLink || "cliquez ici"}</Link>
      </div>
      {userData}
    </div>
  );
}
