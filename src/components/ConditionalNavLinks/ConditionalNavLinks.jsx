import { Link } from "react-router-dom";
import './ConditionalNavLinks.scss'

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
