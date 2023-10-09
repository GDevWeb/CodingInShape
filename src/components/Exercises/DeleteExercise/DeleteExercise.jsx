import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../API/callApi"; 
import { EXERCISES_API } from '../../API/apiAdminExercises';
import './DeleteExercise.scss'; 

export default function DeleteExercise() {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    video: "",
    type: "",
    muscle: "",
  });

  const [serverErrors, setServerErrors] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    try {
      if (!isAdmin) {
        navigate("/login");
        return;
      }

      const { data, status } = await callApi({
        method: "GET",
        url: `${EXERCISES_API}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        setFormData(data);
      } else {
        console.error("Impossible d'obtenir les données de l'exercice.");
        setServerErrors(`Erreur du serveur : ${status}`);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setServerErrors(`Erreur lors de la récupération des données : ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const { status } = await callApi({
        method: "DELETE",
        url: `${EXERCISES_API}/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        setSuccess("Exercice supprimé avec succès");
        setTimeout(() => {
          navigate("/exercise-management");
        }, 3000);
      } else {
        console.error("Échec de la requête de suppression:", status);
        setServerErrors("Une erreur est survenue lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'exercice:", error);
      setServerErrors("Une erreur est survenue lors de la suppression");
    }
  };

  return (
    <div className="deleteExerciseContainer">
      <h2>Supprimer l'exercice {formData.name}</h2>
      <div>
        <p>Confirmez la suppression de l'exercice :</p>
        <p className="exercise-info">Nom : {formData.name}</p>
        <p className="exercise-info">Description : {formData.description}</p>
        <img src={formData.image} alt={formData.name} className="exercise-image" />
        <p className="exercise-info">Type d'exercice : {formData.type}</p>
        <p className="exercise-info">Zone travaillée : {formData.muscle}</p>
      </div>
      <div>
        <button onClick={handleDelete} className="delete-button">
          Confirmer la suppression
        </button>
        {serverErrors && <p className="form-error">{serverErrors}</p>}
        {success && <p className="form-success">{success}</p>}
      </div>
      <Link to="/exercise-management" className="return-link">
        Retour à la gestion des exercices
      </Link>
      <Link to="/exercises-list" className="return-link">
        Retour à la liste des exercices
      </Link>
    </div>
  );
}
