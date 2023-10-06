import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from "../API/apiAdminExercises";
import Spinner from "../../assets/icons/spinner.svg";
import { setExerciseData } from "../../../redux/slices/exerciseSlice"; 
import './ExerciseDetail.scss';

export default function ExerciseDetail() {
  const { id } = useParams();

  // Redux :
  const exercise = useSelector((state) => state.exercise.data); 
  const isLoading = useSelector((state) => state.exercise.isLoading); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

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

          // Utilisez l'action Redux pour mettre à jour l'état de l'exercice
          dispatch(setExerciseData(data));
        } else {
          console.error(
            "Impossible de récupérer les données de l'exercice. Statut HTTP :",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'exercice :",
          error
        );
      }
    };

    fetchExercise();
  }, [id, navigate, isAuthenticated, token, dispatch]);

  return (
    <div className="exerciseDetailContainer">
      <h2>Exercise Detail</h2>
      {isLoading ? (
        <img src={Spinner} alt="Chargement en cours..." />
      ) : (
        <>
          {exercise ? (
            <div className="exerciseDetail">
              <h2>{exercise.name}</h2>
              <p>Description : {exercise.description}</p>
              <p>Type : {exercise.type}</p>
              <p>Muscle ciblé : {exercise.muscle}</p>
              <img
                src={exercise.image}
                alt={`Image de ${exercise.name}`}
                width={"200px"}
              />
            </div>
          ) : (
            <p>Exercice non trouvé</p>
          )}
        </>
      )}
      <Link to={"/exercises-list"}>Retour à la liste des exercices</Link>
    </div>
  );
}

/*📖 Composant admin - Exercises
Supprimer un exercise
📖*/