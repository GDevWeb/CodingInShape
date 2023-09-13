import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsersData } from "./fetchUserData";
import UserManagement from "./UserManagement";
import AddUser from "./AddUser";
import ExerciseManagement from "./ExerciseManagement";
import Spinner from "../../assets/icons/spinner.svg";

export default function DashboardPage() {
  // État local pour stocker les données des utilisateurs, le chargement,
  // et les indicateurs d'affichage de la liste des utilisateurs, du formulaire d'ajout,
  // et de la liste des exercices.
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showListOfUsers, setShowListOfUsers] = useState(true);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showListOfExercises, setShowListOfExercises] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  // Hook pour obtenir la fonction de navigation de React Router
  const navigate = useNavigate();

  // Hook useEffect pour récupérer les données des utilisateurs depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersData(); // Utilisez la fonction fetchUsersData
        setUsersData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);  return (
    <>
      <h2>Dashboard</h2>
      {isLoading && <img src={Spinner} alt="loading" />}
      <h3>Gestion des utilisateurs :</h3>

      <button onClick={() => setShowListOfUsers(!showListOfUsers)}>
        {showListOfUsers
          ? "Cacher la liste des utilisateurs"
          : "Afficher la liste des utilisateurs"}
      </button>
      {showListOfUsers && <UserManagement toggleUpdate={toggleUpdate} />}

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
      {showListOfExercises && <ExerciseManagement />}
    </>
  );
}
