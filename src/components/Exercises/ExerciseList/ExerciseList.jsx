import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { EXERCISES_API } from "../../API/apiAdminExercises";
import Spinner from "../../../assets/icons/spinner.svg";
import { callApi } from "../../API/callApi";
import { setUserData } from "../../../../redux/slices/authSlice";
import CardExercise from "../../Card/CardExercise";
import Icons from "../../../assets/icons/index_icons";
import "./ExerciseList.scss";

export default function ExerciseList() {
  // État local :
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMssg, setErrorMssg] = useState(""); // Variable pour afficher les erreurs serveur

  // Redux :
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  // states filter :
  const [filterOptions, setFilterOptions] = useState({
    type: "",
    muscle: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [exercisePerPage] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const { data, status } = await callApi({
          method: "GET",
          url: EXERCISES_API,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 200) {
          dispatch(setUserData(data));
          setExercises(data);
          setIsLoading(false);
        } else {
          setErrorMssg(
            "Impossible de récupérer les données des exercices. Statut HTTP : " +
              status
          );
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMssg(
          "Erreur lors de la récupération des données des exercices : " + error
        );
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [token, isAuthenticated, dispatch, navigate]);

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

    // Pagination :
    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
    filteredExercises = filteredExercises.slice(
      indexOfFirstExercise,
      indexOfLastExercise
    );

    return filteredExercises;
  };

  return (
    <div className="exerciseContainer">
      <div className="title">
        <h1>Liste des exercices :</h1>
      </div>
      <div className="filterContainer">
        <h3>Filtres :</h3>
        <div className="filterType">
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

        <div className="filterMuscle">
          <label>Muscle ciblé :</label>
          <select
            value={filterOptions.muscle}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, muscle: e.target.value })
            }
          >
            <option value="">Tous</option>
            <option value="Cervicaux">Cervicaux</option>
            <option value="Épaules">Épaules</option>
            <option value="Hanches">Hanches</option>
            <option value="Jambes">Jambes</option>
          </select>
        </div>
      </div>

      {isLoading && <img src={Spinner} alt="Chargement en cours..." />}
      {errorMssg && <span className="error">{errorMssg}</span>}
      <ul className="exercise-item">
        {filterExercises(exercises, filterOptions).map((exercise) => (
          <CardExercise
            key={exercise._id}
            exercise={exercise}
            isAdmin={isAdmin}
          />
        ))}
      </ul>

      <div className="paginContainer">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={Icons.ArrowLeft} alt="page précédente" className="icon" />
        </button>

        <div className="index_pagination">
          <p>
            page {currentPage} sur{" "}
            {Math.ceil(exercises.length / exercisePerPage)}
          </p>
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(exercises.length / exercisePerPage)
          }
        >
          <img src={Icons.ArrowRight} alt="page suivante" className="icon" />
        </button>
      </div>

      <div className="navigate-links">
        {isAdmin && (
          <div className="navigate-link">
            <Link to={"/exercise-management"} className="return-link">
              <p>Gestion des exercices</p>
            </Link>
      <Link to={"/exercises"} className="return-link">
        Mon espace exercices
      </Link>
          </div>
        )}
      </div>

      <div className="return-link_container">
</div>

    </div>
  );
}
