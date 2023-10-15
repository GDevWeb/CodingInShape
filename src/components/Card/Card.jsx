import { Link } from "react-router-dom"; 
// import "./Card.scss";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export default function Card({ title, icon, content, link, textLink, userData }) {

  const truncatedContent = truncateText(content, 300);
  
  return (
    <div className="cardContainer">
      <img src={icon} alt="icon de card"className="icon" />
      <h2 className="card-header">{title}</h2>
      <p className="card-content">{truncatedContent}</p>
      <div className="card-link">
        <Link to={link} className="linkTo">{textLink || "cliquez ici"}</Link>
      </div>
      {userData}
    </div>
  );
}

/*📖Composant utilisé dans la plupart de mes composant lorsque j'ai besoin de card .... 📖*/