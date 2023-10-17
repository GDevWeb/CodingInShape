import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from "../API/apiAdminExercises";

export default function FormContact() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  // Pour gérer le message de succès si tous les inputs sont valides :
  const [success, setSuccess] = useState("");
  
  //   Pour gérer les messages d'erreur server :
  const [serverErrors, setServerErrors] = useState("");

  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vérifications des inputs :

    //01. Vérification du nom de l'exercice :
    if (name === "name") {
      const regexName = /^.{3,}$/; // Au moins 3 caractères
      const testName = regexName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: testName
          ? ""
          : "Le nom doit etre de au moins 3 caractères",
      }));
    }

    //02. Vérification de la description :
    if (name === "description") {
      const regexDescription = /^.{25,}$/; // Au moins 3 caractères
      const testDescription = regexDescription.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: testDescription
          ? ""
          : "La description doit contenir au moins 25 caractères",
      }));
    }

    // 07. Vérification du champ muscle :
    if (name === "category") {
      const regexCategory = /^.{3,}$/; // Au moins 3 caractères
      const testCategory = regexCategory.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: testCategory ? "" : "La zone de la category ne peut être vide",
      }));
    }
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (!isAdmin) {
  //         navigate("/login");
  //         return;
  //       }

  //       const response = await fetch(`${EXERCISES_API}/${id}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setFormData(data);
  //       } else {
  //         console.error(
  //           "Impossible d'obtenir les données de l'utilisateur. HTTP Status:",
  //           response.status
  //         );
  //         setServerErrors("Impossible d'obtenir les données de l'utilisateur");
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des données:", error);
  //       setServerErrors("Erreur lors de la récupération des données");
  //     }
  //   };

  //   fetchUserData();
  // }, [isAdmin, token,id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
    const isValid =
      formData.name &&
      formData.description &&
      formData.category &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setSuccess("Contact envoyer avec succées");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
    };

    // Envoi de la requête au serveur :
    console.log("Token obtenu :", token);

    try {
      // Envoi de la requête PUT au serveur
      const response = await fetch(`${EXERCISES_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // La requête a réussi (statut 200 OK)
        const responseData = await response.json();
        console.log("Réponse du serveur :", responseData);
        setServerErrors(responseData);
        // On vide le formulaire :
        setFormData({
          name: "",
          description: "",
          category: "",
        });

        // On redirige l'utilisateur vers la liste des exercices :
        setTimeout(() => {
          navigate("/exercises-list");
        }, 3000);
      } else {
        console.error("Échec de la requête :", response.statusText);
        return response({ error: "Une erreur est survenue" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="updateExerciseContainer">
      <h2>Contacter l'équipe</h2>
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
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Le sujet de votre message</label>
          <select
            value={formData.category}
            onChange={handleChange}
            name="category"
            id="category"
          >
            <option value="0">Choisissez la catégorie</option>
            <option value="exercice">Exercice</option>
            <option value="auth">Authentification</option>
            <option value="myAccount">Mon compte</option>
            <option value="inscription">Inscription</option>
          </select>
          <span className="error">{errors.category}</span>
        </div>

        <button type="submit">Modifier</button>
        {success && <p className="form-success">{success}</p>}
        <p>{serverErrors}</p>
      </form>
    </div>
  );
}
