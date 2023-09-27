import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

export default function DashboardPage() {
  // Redux :
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData); // Accédez aux données utilisateur depuis votre slice AuthSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAdmin) {
          // Redirige l'utilisateur vers la page de connexion si non authentifié ou non administrateur
          navigate("/login");
          return;
        }

        // userData est déjà dispo dans le Redux Store depuis l'action loginSuccess dans LoginForm, je me fais chier pour rien
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin, navigate, dispatch]);

  return (
    <>
      {userData && (
        <>
          <Card
            title={"Liste des utilisateurs"}
            content={"Retrouver la liste des utilisateurs"}
            link="/users-list"
          />

          <Card
            title={"Ajouter un utilisateur"}
            content={"Formulaire d'ajout d'utilisateur"}
            link="/add-user"
          />

          <Card
            title={"Gestion des exercices"}
            content={"Accéder à la gestion des exercices"}
            link="/exercise-management"
          />

          <Card
            title={"Liste des messages"}
            content={
              "Accéder à la liste des messages provenant des utilisateurs"
            }
            link="/dashboard"
            //  à venir
          />
        </>
      )}
    </>
  );
}
// Olivier tu as du style mais tout ce que je n'aime pas ... Jenna Lee