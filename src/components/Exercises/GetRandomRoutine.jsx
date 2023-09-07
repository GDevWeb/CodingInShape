import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/icons/spinner.svg";

export default function GetRandomRoutine() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Slider :
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [completedSlides, setCompletedSlides] = useState(0); // Compteur de sliders terminés
  const [showCongratulations, setShowCongratulations] = useState(false); // État pour afficher les félicitations

  const navigate = useNavigate();
  const intervalIdRef = useRef(null);

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
          console.log(
            "Données de la routine des exercices récupérées :",
            data
          );
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

  const startTimer = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      if (isPlaying && timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      } else {
        clearInterval(intervalIdRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      handleNext();
      setTimeLeft(20);
    }
  }, [timeLeft, isPlaying]);

  // Slider :
  // Exercice suivant :
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exercises.length);
    setTimeLeft(20);

    if (completedSlides === 4) {
      setShowCongratulations(true);
      setIsPlaying(false);
    } else if (completedSlides < 4) {
      setCompletedSlides((prevCount) => prevCount + 1);
    }
  };

  // Exercice précédent :
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? exercises.length - 1 : prevIndex - 1
    );
    setTimeLeft(20);
  };

  return (
    <div>
      {isLoading ? (
        <>
          <img src={Spinner} alt="Chargement en cours" />
          <p>Chargement en cours...</p>
        </>
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
            {showCongratulations ? (
              <p>Félicitations, vous avez terminé les 5 exercices de la routine !</p>
            ) : (
              <>
                <h3>{exercises[currentIndex].name}</h3>
                <p>Description : {exercises[currentIndex].description}</p>

                <img
                  src={exercises[currentIndex].image}
                  alt="Image de l'exercice"
                />

                {isPlaying && <p>Temps restant : {timeLeft} secondes</p>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
// #V2 ajouter le nbr de routines accomplies par l'utilisateur dans la bdd : 