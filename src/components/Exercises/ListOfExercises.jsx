import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/icons/spinner.svg";


export default function ListOfExercises() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    type: "",
    muscle: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisePerPage] = useState(4);

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
      <div>
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
        {filterExercises(exercises, filterOptions).map((exercise, index) => (
          <li key={exercise._id}>
            <h2>{exercise.name}</h2>
            <p>Description : {exercise.description}</p>
            <p>Type : {exercise.type}</p>
            <p>Muscle ciblé : {exercise.muscle}</p>
            <img src={exercise.image} alt={`Image de ${exercise.name}`} width={"200px"}/>
            <video controls>
              <source src={exercise.video} type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture de la vidéo.
            </video>
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
{/* Revoir le calcul pour trouver la dernière page : */}
<p>page {currentPage} sur {currentPage+1}</p>
    </div>
  );
}
