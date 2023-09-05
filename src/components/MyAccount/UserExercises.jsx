import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/icons/spinner.svg";

export default function UserExercises({ userData }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFiltetrOptions] = useState({ 

    type: "",
    muscle: "",

  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token obtenu :", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/exercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données des exercices récupérées :", data);
          setExercises(data);
          console.log(data.exercises);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données des exercices. Statut HTTP :",
            response.status
            );
            setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des exercices :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [navigate]);

  return (
    <div>
      <p>Exercices</p>
      {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
      <ul>
        {exercises &&
          exercises.map((exercise, index) => (
            <li key={exercise._id}>
              <h2>{exercise.name}</h2>
              <p>Description : {exercise.description}</p>
              <p>Type : {exercise.type}</p>
              <p>Muscle ciblé : {exercise.muscle}</p>
              <img src={exercise.image} alt={`Image de ${exercise.name}`} />
              <video controls>
                <source src={exercise.video} type="video/mp4" />
                Votre navigateur ne prend pas en charge la lecture de la vidéo.
              </video>
            </li>
          ))}
      </ul>
    </div>
  );
}
