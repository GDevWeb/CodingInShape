import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";
import Card from "../Card/Card";
import './DashBoardPage.scss'

export default function DashboardPage() {
  // Redux :
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin, navigate, dispatch]);

  return (
    <div className="dashBoardContainer">
      {userData && (
        <>
          <h1>
            Bienvenue dans l'espace admin, administrateur {userData.pseudo}
          </h1>
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

      <ConditionalNavLinks isAdmin={isAdmin} />
    </div >
  );
}

/*📖 Composant accueillant des links vers le CRUD user et exercises 📖*/

// et ben jena lee je te remercie beaucoup ;o) ... Olivier