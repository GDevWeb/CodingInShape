import { Link } from "react-router-dom";

export default function ConditionalNavLinks({ isAdminLoaded, isAdmin }) {
  return (
    <>
      {isAdminLoaded && isAdmin && (
        <Link to="/dashboard" className="linkTo">
          Retour au dashboard
        </Link>
      )}
      <div className="nav-links">
        <div className="nav-link">
        </div>
        <div className="nav-link">
          <Link to="/myaccount" className="linkTo">
            Retour à mon compte
          </Link>
        </div>
      </div>
    </>
  );
}
