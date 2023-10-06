import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from "../../API/apiAdminExercises";
import './UpdateExercise.scss'

export default function UpdateExercise() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    type: "",
    muscle: "",
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

    // Vérifications des inputs :

    //01. Vérification du nom de l'exercice :
    if (name === "name") {
      const regexName = /^.{3,}$/; // Au moins 3 caractères
      const testName = regexName.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: testName
          ? ""
          : "Le nom de l'exercice doit contenir au moins 3 caractères",
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

    //03. Vérification du champ image :
    if (name === "image") {
      const regexImgURL = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
      const testImageUrl = regexImgURL.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: testImageUrl ? "" : "L'url de l'image n'est pas valide",
      }));
    }


    //05. Vérification du champ type d'exercice :
    if (name === "type") {
      const regexType = /^.{3,}$/; // Au moins 3 caractères
      const testType = regexType.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: testType ? "" : "Le champs type ne peut être vide",
      }));
    }

    // 07. Vérification du champ muscle :
    if (name === "muscle") {
      const regexMuscle = /^.{3,}$/; // Au moins 3 caractères
      const testMuscle = regexMuscle.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        muscle: testMuscle ? "" : "Le champ zone travaillée ne peut être vide",
      }));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
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
            "Impossible d'obtenir les données de l'utilisateur. HTTP Status:",
            response.status
          );
          setServerErrors("Impossible d'obtenir les données de l'utilisateur");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setServerErrors("Erreur lors de la récupération des données");
      }
    };

    fetchUserData();
  }, [isAdmin, token,id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs :
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

    setSuccess("Exercice modifié avec succès");

    // Création d'un objet contenant les données du formulaire à envoyer au serveur :
    const requestData = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      type: formData.type,
      muscle: formData.muscle,
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
          image: "",
          type: "",
          muscle: "",
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
      <h2>Modifier l'exercice {useParams.name}</h2>
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            cols={50}
            rows={25}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
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
            <option value="Neck"> Cervical</option>
            <option value="Shoulders">Épaules</option>
            <option value="Back">Dos</option>
            <option value="Hips">Hanches</option>
            <option value="Legs">Jambes</option>
          </select>
          <span className="error">{errors.muscle}</span>
        </div>

        <button type="submit">Modifier</button>
        {success && <p className="form-success">{success}</p>}
        {/* <p>{serverErrors}</p> */}
      </form>
      <Link to={"/dashboard"}>Retour au dashboard</Link>
      <Link to={"/exercise-management"}>Retour à gestion des exercices</Link>
      <Link to={"/exercises-list"}>Retour à la liste des exercices</Link>
    </div>
  );
}

/*📖 Composant admin et user - Exercises
Update Exercise
📖*/