import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { fetchUsersData } from "./fetchUserData";
import Spinner from "../../assets/icons/spinner.svg";
import Card from "../Card/Card";



export default function DashboardPage() {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersData();
        setUsersData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

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
      content={"Accéder à la liste des messages provenant des utilisateurs"}
      link="/dashboard"
      //  à venir
    />

        </>
      )}
    </>
  );
}
