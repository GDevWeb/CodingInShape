import { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from '../API/apiAdminExercises';

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

      const response = await fetch(`${EXERCISES_API}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error(
          "Impossible d'obtenir les données de l'exercice. HTTP Status:",
          response.status
        );
        setServerErrors("Impossible d'obtenir les données de l'exercice");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setServerErrors("Erreur lors de la récupération des données");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const handleDelete = async () => {

    try {
      const response = await fetch(`${EXERCISES_API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        setSuccess("Exercice supprimé avec succès");
        setTimeout(() => {
          navigate("/exercise-management");
        }, 3000);
      } else {
        console.error("Échec de la requête de suppression:", response.statusText);
        setServerErrors("Une erreur est survenue lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'exercice:", error);
      setServerErrors("Une erreur est survenue lors de la suppression");
    }
  };

  return (
    <>
      <h2>Supprimer l'exercice {formData.name}</h2>
      <div>
        <p>Confirmez la suppression de l'exercice :</p>
        <p>Nom : {formData.name}</p>
        <p>Description : {formData.description}</p>
        <img src={formData.image} alt={formData.name} width={"200px"}/>
        <p>Vidéo : {formData.video}</p>
        <p>Type d'exercice : {formData.type}</p>
        <p>Zone travaillée : {formData.muscle}</p>
      </div>
      <div>
        <button onClick={handleDelete}>Confirmer la suppression</button>
        {serverErrors && <p className="form-error">{serverErrors}</p>}
        {success && <p className="form-success">{success}</p>}
      </div>
      <Link to={"/dashboard"}>Retour au dashboard</Link>
      <Link to={"/exercise-management"}>Retour à la gestion des exercices</Link>
      <Link to={"/exercises-list"}>Retour à la liste des exercices</Link>
    </>
  );
}

// updates with redux auth :