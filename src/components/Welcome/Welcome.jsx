import { Link } from "react-router-dom";
import "./Welcome.scss";
import RandomQuote from "../RandomQuote/RandomQuote";
import { useSelector } from "react-redux";

export default function Welcome() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div className="welcomePage">
        <div className="welcomeTitle">
          <h2>🤸La plateforme qui prend soin de vous🤸</h2>
        </div>

        <div className="welcomeText">
          <p>
            Bienvenue sur notre site dédié à votre bien-être au bureau ! En tant
            que développeur web ou bien employé de bureau, vous savez à quel point les longues heures
            devant l'ordinateur peuvent être éprouvantes pour votre corps. Nous
            sommes là pour vous offrir des conseils posturaux simples et des
            exercices de quelques minutes qui vous aideront à soulager les
            tensions musculaires, à améliorer votre posture et à augmenter votre
            productivité.
          </p>
        </div>

    {/* Rendu conditionnel si non authentifié invite à se connecter ou créer un compte : */}
        {!isAuthenticated && (
          <div className="buttons links-log">
            <Link className="FormConnexion" to="/signup">
              Créer un compte
            </Link>
            <Link className="FormConnexion" to="/login">
              Se connecter
            </Link>
          </div>
        )}
        <RandomQuote />
      </div>
    </>
  );
}

/*📖Simple composant stateless contenant un texte de bienvenue et des links invitants à créer un compte ou à se connecter📖*/
