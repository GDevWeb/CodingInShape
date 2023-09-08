import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddExercises() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    age: "",
    image: "",
    video: "",
    type: "",
    muscle: "",
  });

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    age: "",
    image: "",
    video: "",
    type: "",
    muscle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vérifications des inputs :

    //01. Vérification du prénom :
    if (name === "name") {
      const regexFirstName = /^.{3,}$/; // Au moins 3 caractères
      const testFirstName = regexFirstName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: testFirstName
          ? ""
          : "Le prénom doit contenir au moins 3 caractères",
      }));
    }

    //02. Vérification du nom :
    if (name === "description") {
      const regexLastName = /^.{3,}$/; // Au moins 3 caractères
      const testLastName = regexLastName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: testLastName
          ? ""
          : "Le nom doit contenir au moins 3 caractères",
      }));
    }

    //03. Vérification de l'âge :
    if (name === "age") {
      const regexAge = /^[0-9]{2,}$/; // Au moins 2 chiffres
      const testAge = regexAge.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: testAge ? "" : "L'âge doit contenir au moins 2 chiffres",
      }));
    }

    //04. Vérification du image :
    if (name === "image") {
      const regexPseudo = /^.{3,}$/; // Au moins 3 caractères
      const testPseudo = regexPseudo.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: testPseudo
          ? ""
          : "Le image doit contenir au moins 3 caractères",
      }));
    }

    //05. Vérification de l'video :
    if (name === "video") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        video: testEmail ? "" : "L'video n'est pas valide",
      }));
    }

    //06. Vérification de la question secrète :
    if (name === "type") {
      const regexSecurityQuestion = /^.{3,}$/; // Au moins 3 caractères
      const testSecurityQuestion = regexSecurityQuestion.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: testSecurityQuestion
          ? ""
          : "La question secrète doit contenir au moins 3 caractères",
      }));
    }

    // 07. Vérification de la réponse à la question secrète :
    if (name === "muscle") {
      const regexSecurityAnswer = /^.{3,}$/; // Au moins 3 caractères
      const testSecurityAnswer = regexSecurityAnswer.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        muscle: testSecurityAnswer
          ? ""
          : "La réponse à la question secrète doit contenir au moins 3 caractères",
      }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      formData.name &&
      formData.description &&
      formData.age &&
      formData.image &&
      formData.video &&
      formData.password &&
      formData.type &&
      formData.muscle &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setSuccess("Votre compte a bien été créé");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      name: formData.name,
      description: formData.description,
      age: formData.age,
      image: formData.image,
      video: formData.video,
      type: formData.type,
      muscle: formData.muscle,
    };

    try {
      // Envoi de la requête POST au serveur
      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // La requête a réussi (statut 200 OK)
        const responseData = await response.json();
        console.log("Réponse du serveur :", responseData);

        // On vide le formulaire :
        setFormData({
          name: "",
          description: "",
          age: "",
          image: "",
          video: "",
          type: "",
          muscle: "",
        });

        navigate("/login");
      } else {
        // La requête a échoué
        console.error("Échec de la requête :", response.statusText);
        return response({ error: "Une erreur est survenue" });
      }
    } catch (error) {
      // Une erreur s'est produite lors de l'envoi de la requête
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <p className="form-error">{errors.description}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
            {errors.image && <p className="form-error">{errors.image}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="video">Video</label>
            <input type="text" id="video" name="video" value={formData.video} onChange={handleChange} />
            {errors.video && <p className="form-error">{errors.video}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} />
            {errors.type && <p className="form-error">{errors.type}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="muscle">Muscle</label>
            <input type="text" id="muscle" name="muscle" value={formData.muscle} onChange={handleChange} />
            {errors.muscle && <p className="form-error">{errors.muscle}</p>}
        </div>

        <button type="submit">Ajouter</button>
        {success && <p className="form-success">{success}</p>}

    </form>
  );
}