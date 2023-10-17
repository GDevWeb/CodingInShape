import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConditionalNavLinks from "../../ConditionalNavLinks/ConditionalNavLinks";
import Card from "../../Card/Card";
import icons from "../../../assets/icons/index_icons"
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
            Bienvenue dans l'espace administrateur
          </h1>
          <div className="containerCards">

          <Card
          icon={icons.Users}
            title={"Liste des utilisateurs"}
            content={"Retrouver la liste des utilisateurs"}
            link="/users-list"
            />

          <Card
          icon={icons.UserPlus}
            title={"Ajouter un utilisateur"}
            content={"Formulaire d'ajout d'utilisateur"}
            link="/add-user"
          />

          <Card
          icon={icons.Dumbbell}
            title={"Gestion des exercices"}
            content={"Accéder à la gestion des exercices"}
            link="/exercise-management"
            />

          <Card
          icon={icons.Envelope}
          title={"Liste des messages"}
          content={
            "Messages des utilisateurs"
          }
          link="/dashboard"
          />
          </div>
        </>
      
      )}

      <div className="navigate-link">
      <ConditionalNavLinks isAdmin={isAdmin}/>
      </div>

    </div >
  );
}

/*📖 Composant accueillant des links vers le CRUD user et exercises 📖*/
