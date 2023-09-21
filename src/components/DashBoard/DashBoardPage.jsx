import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/icons/spinner.svg";
import Card from "../Card/Card";
import { updateAdminStatus } from "../../../redux/actions/authActions";

export default function DashboardPage() {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redux :
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const fetchUsersData = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Échec de la récupération des données des utilisateurs.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAdmin) {
          console.log('isAdmin is false or user is not authenticated');
          navigate("/login"); 
          return;
        }

        // Log de la valeur d'isAdmin
      console.log('isAdmin:', isAdmin);

       // Log de la valeur d'isAdmin avant l'appel à updateAdminStatus
    console.log('Current isAdmin value before dispatch:', isAdmin);

    // Appel à updateAdminStatus
    dispatch(updateAdminStatus(true));

        // Appel au backend pour obtenir le statut isAdmin
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          const isAdmin = data.isAdmin;
          dispatch(updateAdminStatus(isAdmin)); // Mise à jour le statut isAdmin dans le store Redux
        } else {
          throw new Error('Échec de la récupération du statut isAdmin.');
        }

        // Continue avec le chargement des données des utilisateurs
        const usersData = await fetchUsersData();
        setUsersData(usersData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ isAuthenticated, isAdmin, navigate, token, dispatch ]);

  return (
    <>
      {isLoading && <img src={Spinner} alt="loading" />}
      {usersData && (
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
