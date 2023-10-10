import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from "../../API/apiAdminExercises";
import Spinner from "../../../assets/icons/spinner.svg";
import { callApi } from "../../API/callApi";
import { setExerciseData } from "../../../../redux/slices/exerciseSlice";
import "./ExerciseDetail.scss";

export default function ExerciseDetail() {
  const { id } = useParams();

  // Redux :
  const exercise = useSelector((state) => state.exercise.data);
  const isLoading = useSelector((state) => state.exercise.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMssg, setErrorMssg] = useState("");

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

        const { data, status } = await callApi({
          method: "GET",
          url: `${EXERCISES_API}/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 200) {
          dispatch(setExerciseData(data));
        } else {
          setErrorMssg(
            "Impossible de récupérer les données de l'exercice. Statut HTTP : " +
              status
          );
        }
      } catch (error) {
        setErrorMssg(
          "Erreur lors de la récupération des données de l'exercice : " + error
        );
      }
    };

    fetchExercise();
  }, [id, navigate, isAuthenticated, token, dispatch]);

  return (
    <div className="exerciseDetailContainer">
      <h2>Détail de l'exercice </h2>
      {isLoading ? (
        <img src={Spinner} alt="Chargement en cours..." />
      ) : (
        <>
          {exercise ? (
            <div className="exercise-card">
              <h2 className="exercise-name">{exercise.name}</h2>
              <p className="exercise-description">
                Description : {exercise.description}
              </p>
              <p className="exercise-type">Type : {exercise.type}</p>
              <p className="exercise-muscle">
                Muscle ciblé : {exercise.muscle}
              </p>
              <img
                src={exercise.image}
                alt={`Image de ${exercise.name}`}
                width={"200px"}
                className="exercise-img"
              />
            </div>
          ) : (
            <p className="errors">Exercice non trouvé</p>
          )}
      {errorMssg && <span className="error">{errorMssg}</span>}
        </>
      )}
      <Link to={"/exercises-list"}>Retour à la liste des exercices</Link>
    </div>
  );
}
