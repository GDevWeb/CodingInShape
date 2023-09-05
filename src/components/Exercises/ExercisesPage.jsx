import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRandomRoutine from "./GetRandomRoutine";
import ListOfExercises from "./ListOfExercises";

export default function ExercisesPage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showListOfExercises, setShowListOfExercises] = useState(false);
  const [showGetRandomRoutine, setShowGetRandomRoutine] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        // Récupérer le token depuis les cookies
        // const token = Cookies.get("token");
        const token = localStorage.getItem("token");
        console.log("Token obtenu :", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/auth/MyProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données de l'utilisateur."
          );
          setIsLoading(false);
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
  }, [navigate]);

  return (
    <>
      <h2>Liste des Exercises</h2>
      <button onClick={() => setShowListOfExercises(!showListOfExercises)}>
        {showListOfExercises ? "Cacher la liste des exercices" : "Afficher la liste des exercices"}
      </button>
      {showListOfExercises && <ListOfExercises />}


      <h2>GetRandomRoutine</h2>
      <button onClick={()=> setShowGetRandomRoutine(!showGetRandomRoutine)}>
    {showGetRandomRoutine ? "Cacher la routine d'exercices" : "Afficher la routine d'exercices"}
      </button>
      {showGetRandomRoutine && <GetRandomRoutine/>} 
    </>
  );
}
