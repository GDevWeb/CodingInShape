import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import AddUser from "./AddUser";
import ExerciseManagement from "./ExerciseManagement";

export default function DashBoardPage() {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // toggle CRUD Users :
  const [showListOfUsers, setShowListOfUsers] = useState(false);

  const [showAddUserForm, setShowAddUserForm] = useState(false);

  // toggle CRUD Exercises :
  const [showListOfExercises, setShowListOfExercises] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token obtenu :", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:4000/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données des utilisateurs récupérées :", data);
          setUsersData(data);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données des utilisateurs. Statut HTTP :",
            response.status
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des utilisateurs :",
          error
        );
        setIsLoading(false);
      }
    };
    fetchUsersData();
  }, [navigate]);
  return (
    <>
      <h2>Dashboard</h2>
      <h3>Gestion des utilisateurs :</h3>

      <button onClick={() => setShowListOfUsers(!showListOfUsers)}>
        {showListOfUsers
          ? "Cacher la liste des utilisateurs"
          : "Afficher la liste des utilisateurs"}
      </button>
      {showListOfUsers && <UserManagement />}

      <h2>Ajouter un utilisateur :</h2>
      <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? "Cacher formulaire Ajout utilisateur" : "Ajouter un utilisateur"}
      </button>
      {showAddUserForm && <AddUser />}


      

      <h3>Gestion des exercices :</h3>
      <button onClick={() => setShowListOfExercises(!showListOfExercises)}>
        {showListOfExercises
          ? "Cacher la liste des exercices"
          : "Afficher la liste des exercices"}
      </button>
      {showListOfExercises && <ExerciseManagement/>}
    </>
  );
}
