import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/Card";
import index_icons from "../../../assets/icons/index_icons";
import "./ExercisePage.scss";

export default function ExercisesPage() {
  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);

  // Navigation :
  const navigate = useNavigate();

  // Contrôle de l'état authentifié :
  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/login"); //provisoirement commenté
    // }
  }, [isAuthenticated, token, navigate]);

  return (
    <>
      {userData && (
        <div className="ContainerCardsExercices">
          <Card
            icon={index_icons.List}
            title={"Liste des exercices"}
            content={"Retrouvez la liste des exercices"}
            link={`/exercises-list/`}
            textLink={"Voir la liste des exercices"}
          />

          <Card
            icon={index_icons.Shuffle}
            title={"Routine aléatoire"}
            content={`🚀 Vous ne savez pas par où commencer ? Laissez-vous guider par notre app ! 🚀
      `}
            link={"/get-random-routine"}
            textLink={"Démarrer la routine"}
          />
        </div>
      )}
    </>
  );
}

/*📖 Composant admin et user - Exercises
Lien vers la liste des exercices
Routine aléatoire
📖*/
