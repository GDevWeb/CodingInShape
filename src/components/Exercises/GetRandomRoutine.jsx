import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GET_RANDOM_ROUTINE } from "../API/apiUserExercises";
import Spinner from "../../assets/icons/spinner.svg";
import Introduction from "../Introduction/Introduction";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";

export default function GetRandomRoutine() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch(); 

  // Slider :
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Démarrer en mode "Pause"
  const [timeLeft, setTimeLeft] = useState(20);
  const [completedSlides, setCompletedSlides] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Redirection :
  const navigate = useNavigate();

  const intervalIdRef = useRef(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {

        if ( !isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${GET_RANDOM_ROUTINE}`,
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
          <h2>Introduction :</h2>
          <Introduction />
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
              <p>
                Félicitations, vous avez terminé les 5 exercices de la routine !
              </p>
            ) : (
              <>
                <h3>{exercises[currentIndex].muscle}</h3>
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
      <ConditionalNavLinks />
      <Link to={"/exercises"}>Retour à mon espace exercices</Link>
    </div>
  );
}
