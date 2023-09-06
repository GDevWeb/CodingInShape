import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetRandomRoutine() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

        const response = await fetch(
          "http://localhost:3000/api/exercises/random",
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
          console.log("Données de la routine des exercices récupérées :", data);
          setExercises(data);
          setIsLoading(false);
          setIsPlaying(true);
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

  // Slider :
  // Exercice suivant :
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exercises.length);
  };

  // Exercice précédent :
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? exercises.length - 1 : prevIndex - 1
    );
  };
    
    return (
      <div>
        {isLoading ? (
          <p>Chargement en cours...</p>
          ) : (
            <div>
            <h2>Diaporama d'exercices</h2>
            <div>
              <button onClick={handlePrevious}>Précédent</button>
              <button onClick={handleNext}>Suivant</button>
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Pause" : "Démarrer"}
              </button>
              <button onClick={() => setCurrentIndex(0)}>Recommencer</button>
            </div>
            <div>
              <h3>{exercises[currentIndex].name}</h3>
              <p>Description : {exercises[currentIndex].description}</p>

              <img src={exercises.image} alt="Image de l'exercice" />

            </div>
          </div>
        )}
      </div>
    );
}
