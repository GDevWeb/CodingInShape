import { Link } from "react-router-dom";
// import './ConditionalNavLinks.scss'

export default function ConditionalNavLinks({ isAdmin }) {
  return (
    <>
    <div className="containerLink">
      {isAdmin && (
        <Link to="/dashboard" className="linkTo">
          Retour au dashboard
        </Link>
      )}

          <Link to="/myaccount" className="linkTo">
            Retour à mon compte
          </Link>
    </div>
    </>
  );
}

/*📖Composant utilisé dans la plupart de mes composant pour la navigation - 
Rendu conditionnel : ce dernier affiche le link dashBoard seulement si user isAdmin = true 
par défaut retour à mon compte
📖*/