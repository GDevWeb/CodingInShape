import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  USERS_API,
} from "../apiAdmin";

export default function UpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USERS_API}/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
7        } else {
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
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${USERS_API}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage("Utilisateur mis à jour avec succès");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/dashboard")
        }, 3000);

      } else {
        console.error(
          "Impossible de mettre à jour les informations de l'utilisateur. HTTP Status:",
          response.status
        );
        setServerErrors(
          "Impossible de mettre à jour les informations de l'utilisateur"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données:", error);
      setServerErrors("Erreur lors de la mise à jour des données");
    }
  };

  return (
    <>
      <h3>Modification des données utilisateur </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">e-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
            <label htmlFor="securityQuestion">Question de sécurité</label>
            <select
              value={userData.securityQuestion}
              onChange={handleChange}
              name="securityQuestion"
              id="securityQuestion"
            >
              <option value="0">Choisissez votre question secrète</option>
              <option value="nomAnimal">
                {" "}
                Quel est le nom de votre premier animal de compagnie ?
              </option>
              <option value="nomMere">
                Quel est le nom de jeune fille de votre mère ?
              </option>
              <option value="villeNatale">
                Quel est le nom de votre ville natale ?
              </option>
              <option value="seriePreferee">
                Quelle est votre série préférée ?
              </option>
            </select>
          </div>


        <div className="form-group">
          <label htmlFor="securityAnswer">Réponse</label>
          <input
            type="text"
            name="securityAnswer"
            id="securityAnswer"
            value={userData.securityAnswer}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>

      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="server-error">
        {serverErrors && <p>{serverErrors}</p>}
      </div>
    </>
  );
}
