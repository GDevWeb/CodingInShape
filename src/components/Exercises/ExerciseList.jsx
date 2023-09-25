import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { EXERCISES_API } from "../API/apiAdminExercises";
import Spinner from "../../assets/icons/spinner.svg";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";

export default function ExerciseList() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoaded, setIsAdminLoaded] = useState(false);


  // Redirection :
  const navigate = useNavigate();

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    type: "",
    muscle: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisePerPage] = useState(4);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${EXERCISES_API}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(token)
          console.log("Données des exercices récupérées :", data);
          setExercises(data);
          setIsLoading(false);

          // Mise à jour de l'état local isAdmin
          setIsAdmin(data.userData.isAdmin);
          console.log(data.userData.isAdmin);
          setIsAdminLoaded(true);
          console.log(`Connexion depuis ExerciseList ok`);
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
  }, [isAuthenticated, token, navigate]);

  // Filtres :
  const filterExercises = (exercises, filterOptions) => {
    let filteredExercises = [...exercises];

    if (filterOptions.type) {
      filteredExercises = filteredExercises.filter(
        (exercise) => exercise.type === filterOptions.type
      );
    }

    if (filterOptions.muscle) {
      filteredExercises = filteredExercises.filter(
        (exercise) => exercise.muscle === filterOptions.muscle
      );
    }

    // PAgination :
    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
    filteredExercises = filteredExercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
    );

    return filteredExercises;
  };

  return (
    <div>
      <h2>Liste des exercices disponibles :</h2>
      <div>
        <h3>Filtres :</h3>
        <label>Type :</label>
        <select
          value={filterOptions.type}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, type: e.target.value })
          }
        >
          <option value="">Tous</option>
          <option value="Upper Body">Haut du corps</option>
          <option value="Lower Body">Bas du corps</option>
        </select>
      </div>
      <div>
        <label>Muscle ciblé :</label>
        <select
          value={filterOptions.muscle}
          onChange={(e) =>
            setFilterOptions({ ...filterOptions, muscle: e.target.value })
          }
        >
          <option value="">Tous</option>
          <option value="Neck">Cervicaux</option>
          <option value="Shoulders">Épaules</option>
          <option value="Hips">Hanches</option>
          <option value="Legs">Jambes</option>
        </select>
      </div>
      <p>Exercices</p>
      {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
      <ul>
        {filterExercises(exercises, filterOptions).map((exercise) => (
          <li key={exercise._id}>
            <h2>{exercise.name}</h2>
            <p>Description : {exercise.description}</p>
            <p>Type : {exercise.type}</p>
            <p>Muscle ciblé : {exercise.muscle}</p>
            <Link to={`/exercise-detail/${exercise._id}`}>
              Voir détail l'exercice
            </Link>
            <Link to={`/update-exercise/${exercise._id}`}>
              Modifier l'exercice
            </Link>
            <Link to={`/delete-exercise/${exercise._id}`}>
              Supprimer l'exercice
            </Link>
            <img
              src={exercise.image}
              alt={`Image de ${exercise.name}`}
              width={"200px"}
            />
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Page précédente
      </button>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(exercises.length / exercisePerPage)}
      >
        Page suivante
      </button>
      <p>
        page {currentPage} sur {Math.ceil(exercises.length / exercisePerPage)}
      </p>

      <ConditionalNavLinks isAdminLoaded={isAdminLoaded} isAdmin={isAdmin} />

      <div className="nav-links">
        <div className="nav-link">
          <Link to={"/exercise-management"}>
            Retour à gestion des exercices
          </Link>
        </div>
      </div>
    </div>
  );
}

// pb d'auth 401 - accès refusé :