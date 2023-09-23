import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { USER_PROFIL } from "../API/apiUser";
import GetRandomRoutine from "./GetRandomRoutine";
import ListOfExercises from "./ExerciseList";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";

export default function ExercisesPage() {
  // État local :
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoaded, setAdminLoaded] = useState(false);

  // Toggle :
  const [showListOfExercises, setShowListOfExercises] = useState(false);
  const [showGetRandomRoutine, setShowGetRandomRoutine] = useState(false);

  // Navigation :
  const navigate = useNavigate();

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USER_PROFIL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);

          // Mise à jour de l'état local isAdmin
          setIsAdmin(data.userData.isAdmin);
          setAdminLoaded(true);

          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données de l'utilisateur."
          );
          setIsLoading(false);
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, navigate]);

  return (
    <>
      <h2>Liste des Exercises</h2>
      <button onClick={() => setShowListOfExercises(!showListOfExercises)}>
        {showListOfExercises
          ? "Cacher la liste des exercices"
          : "Afficher la liste des exercices"}
      </button>
      {showListOfExercises && <ListOfExercises />}

      <h2>GetRandomRoutine</h2>
      <button onClick={() => setShowGetRandomRoutine(!showGetRandomRoutine)}>
        {showGetRandomRoutine
          ? "Cacher la routine d'exercices"
          : "Afficher la routine d'exercices"}
      </button>
      {showGetRandomRoutine && <GetRandomRoutine />}

      <ConditionalNavLinks isAdminLoaded={isAdminLoaded} isAdmin={isAdmin} />
    </>
  );
}
