import { Link } from "react-router-dom";
import './ConditionalNavLinks.scss'

export default function ConditionalNavLinks({ isAdmin }) {
  return (
    <>
    <div className="containerLink">
      {isAdmin && (
        <Link to="/dashboard" className="return-link">
          Dashboard
        </Link>
      )}

          <Link to="/myaccount" className="return-link">
            Mon compte
          </Link>
    </div>
    </>
  );
}

/*📖Composant utilisé dans la plupart de mes composant pour la navigation - 
Rendu conditionnel : ce dernier affiche le link dashBoard seulement si user isAdmin = true 
par défaut retour à mon compte
📖*/