import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import { callApi } from "../../API/callApi";
import { GET_RANDOM_ROUTINE } from "../../API/apiUserExercises";
import Introduction from "../../Introduction/Introduction";
import ConditionalNavLinks from "../../ConditionalNavLinks/ConditionalNavLinks";
import icons from "../../../assets/icons/index_icons";
import "./GetRandomRoutine.scss";

export default function GetRandomRoutine() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  // Slider :
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); //"Pause"
  const [timeLeft, setTimeLeft] = useState(20);
  const [completedSlides, setCompletedSlides] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Redirection :
  const navigate = useNavigate();

  const intervalIdRef = useRef(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const { data, status } = await callApi({
          method: "GET",
          url: `${GET_RANDOM_ROUTINE}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 200) {
          setExercises(data);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données des exercices. Statut HTTP :",
            status
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
  }, [navigate, isAuthenticated, token]);

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
    <div className="random-routine-container">
      <h2 className="section-title">Introduction :</h2>
      <Introduction />

      {isLoading ? (
        <div className="loading">
          <img src={icons.Spinner} alt="Chargement en cours" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <div className="exercise-slider">
          <h2 className="section-title">Diaporama d'exercices</h2>
          <div className="exercise-details">
            {showCongratulations ? (
              <p className="congratulations-message">
                Félicitations, vous avez terminé les 5 exercices de la routine !
              </p>
            ) : (
              <>
                <h3 className="exercise-muscle">
                  {exercises[currentIndex]?.muscle}
                </h3>
                <p className="exercise-description">
                  Description : {exercises[currentIndex]?.description}
                </p>

                <figure className="exercise-image_container">
                <img
                  className="exercise-image"
                  src={exercises[currentIndex].image}
                  alt="Image de l'exercice"
                  />
                  </figure>
          <div className="slider-controls">
            <button onClick={handlePrevious}>Précédent</button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Démarrer"}
            </button>
            <button onClick={handleNext}>Suivant</button>
            {/* <button onClick={() => setCurrentIndex(0)}>Recommencer</button> */}
          </div>
                {isPlaying && (
                  <p className="time-left">Temps restant : {timeLeft} secondes</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

<div className="return-link_container">
      <Link to={"/exercises"} className="return-link">
        Retour à mon espace exercices
      </Link>
</div>
    </div>
  );
}
