import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {EXERCISES_API}from '../API/apiAdminExercises';
import Spinner from '../../assets/icons/spinner.svg';

export default function ExerciseDetail() {
  const { id } = useParams();
  
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token obtenu :", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${EXERCISES_API}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données de l'exercice récupérées :", data);
          setExercise(data);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données de l'exercice. Statut HTTP :",
            response.status
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'exercice :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [id, navigate]);

  return (
    <div>
      <h2>Exercise Detail</h2>
      {isLoading ? (
        <img src={Spinner} alt="Chargement en cours..." />
      ) : (
        <>
          {exercise ? (
            <>
              <h2>{exercise.name}</h2>
              <p>Description : {exercise.description}</p>
              <p>Type : {exercise.type}</p>
              <p>Muscle ciblé : {exercise.muscle}</p>
              <img
                src={exercise.image}
                alt={`Image de ${exercise.name}`}
                width={"200px"}
              />
            </>
          ) : (
            <p>Exercice non trouvé</p>
          )}
        </>
      )}
      <Link to={'/exercises-list'}>Retour à la liste des exercices</Link>
    </div>
  );
}
