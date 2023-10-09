import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EXERCISES_API } from "../../API/apiAdminExercises";
import "./AddExercise.scss";
import "../../../../sass/_index.scss";
import { callApi } from "../../API/callApi";

export default function AddExercise() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    type: "",
    muscle: "",
  });

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    type: "",
    muscle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") {
      const regexName = /^.{3,}$/;
      const testName = regexName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: testName
          ? ""
          : "Le nom de l'exercice doit contenir au moins 3 caractères",
      }));
    }

    if (name === "description") {
      const regexDescription = /^.{25,}$/;
      const testDescription = regexDescription.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: testDescription
          ? ""
          : "La description doit contenir au moins 25 caractères",
      }));
    }

    if (name === "image") {
      const regexImgURL = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
      const testImageUrl = regexImgURL.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: testImageUrl ? "" : "L'url de l'image n'est pas valide",
      }));
    }

    if (name === "type") {
      const regexType = /^.{3,}$/;
      const testType = regexType.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: testType ? "" : "Le champ type ne peut être vide",
      }));
    }

    if (name === "muscle") {
      const regexMuscle = /^.{3,}$/;
      const testMuscle = regexMuscle.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        muscle: testMuscle ? "" : "Le champ zone travaillée ne peut être vide",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      formData.name &&
      formData.description &&
      formData.image &&
      formData.type &&
      formData.muscle &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    const requestData = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      type: formData.type,
      muscle: formData.muscle,
    };

    try {
      const { status, data } = await callApi({
        method: "POST",
        url: EXERCISES_API,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: requestData,
      });

      if (status === 201) {
        setSuccess(data.msg);
        setFormData({
          name: "",
          description: "",
          image: "",
          type: "",
          muscle: "",
        });

        setTimeout(() => {
          navigate("/exercise-management");
        }, 3000);
      } else {
        console.error("Échec de la requête :", status);
        setSuccess("Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      setSuccess("Une erreur est survenue");
    }
  };

  return (
    <div className="addExerciseContainer">
      <h2>Ajouter un exercice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <div className="textareaContainer">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imgPreview">Aperçu de l'image</label>
          <figure id="imgPreview" className="imgPreview">
            <img src={formData.image} alt={formData.name} width={"200px"} />
          </figure>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p className="form-error">{errors.image}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type d'exercice</label>
          <select
            value={formData.type}
            onChange={handleChange}
            name="type"
            id="type"
          >
            <option value="0">Choisissez le type d'exercice</option>
            <option value="Upper Body">Exercice pour le haut du corps</option>
            <option value="Lower Body">Exercice pour le bas du corps</option>
          </select>
          <span className="error">{errors.type}</span>
        </div>

        <div className="form-group">
          <label htmlFor="muscle">Zone travaillée</label>
          <select
            value={formData.muscle}
            onChange={handleChange}
            name="muscle"
            id="muscle"
          >
            <option value="0">Choisissez la zone musculaire travaillée</option>
            <option value="Neck">Cervical</option>
            <option value="Shoulders">Épaules</option>
            <option value="Back">Dos</option>
            <option value="Hips">Hanches</option>
            <option value="Legs">Jambes</option>
          </select>
          <span className="error">{errors.muscle}</span>
        </div>

        <button type="submit">Ajouter</button>
        {success && <p className="form-success">{success}</p>}
      </form>
      <Link to={"/dashboard"}>Retour au dashboard</Link>
      <Link to={"/exercise-management"}>Retour à gestion des exercices</Link>
    </div>
  );
}
