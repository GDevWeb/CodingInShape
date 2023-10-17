import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EXERCISES_API } from "../../API/apiAdminExercises";
import { callApi } from "../../API/callApi"; 
import ConditionalNavLinks from "../../ConditionalNavLinks/ConditionalNavLinks"
import "./UpdateExercise.scss";

export default function UpdateExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  
  const token = useSelector((state) => state.auth.token); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    type: "",
    muscle: "",
  });

  const [success, setSuccess] = useState("");
  const [serverErrors, setServerErrors] = useState("");

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

  useEffect(() => {
    const fetchExerciseData = async () => {
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
  
    fetchExerciseData();
  }, [isAdmin, token, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de la saisie des inputs:
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

    try {
      const { status} = await callApi({
        method: "PUT",
        url: `${EXERCISES_API}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });

      if (status === 200) {
        setSuccess("Exercice modifié avec succès");
        setServerErrors("");
        setFormData({
          name: "",
          description: "",
          image: "",
          type: "",
          muscle: "",
        });

        setTimeout(() => {
          navigate("/exercises-list");
        }, 3000);
      } else {
        console.error("Échec de la requête :", status);
        setServerErrors("Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
      setServerErrors(error.message);
    }
  };

  return (
    <div className="updateExerciseContainer">
      <h2>Modifier l'exercice {formData.name}</h2>
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

        <button type="submit" className="put-exercise">
          Modifier
        </button>
        {success && <p className="form-success">{success}</p>}
        <span className="server-error">{serverErrors.toString()}</span>
      </form>
      <Link to={"/exercises-list"}>Retour à la liste des exercices</Link>
      <ConditionalNavLinks
      isAdmin={isAdmin}
      />
    </div>
  );
}
