import { useState } from "react";

export default function UpdateEmailForm() {
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
  });

  // Gestion des messages d'erreurs :
  const [errorMessage, setErrorMessage] = useState({
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
  });

  // Gestion des messages de succès :
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vérification des erreurs :
    if (name === "currentEmail") {
      const regexEmail = /^.{8,}$/; // Au moins 8 caractères
      const testEmail = regexEmail.test(value);
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        currentEmail: testEmail
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }

    if (name === "newEmail") {
      const regexEmail = /^.{8,}$/; // Au moins 8 caractères
      const testEmail = regexEmail.test(value);
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        newEmail: testEmail
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }

    if (name === "confirmNewEmail") {
      const testNewPasswordConfirm = value === formData.newEmail;

      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        confirmNewEmail: testNewPasswordConfirm
          ? ""
          : "Les mots de passe ne correspondent pas",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      currentEmail: formData.currentEmail,
      newEmail: formData.newEmail,
      confirmNewEmail: formData.confirmNewEmail,
    };

    try {
      // Lecture du cookie "token"
      const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;
            console.log("Token obtenu :", token);

      const response = await fetch(
        "http://localhost:4000/api/auth/updateEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData({
          currentEmail: "",
          newEmail: "",
          confirmNewEmail: "",
        });
        console.log(data);
        setSuccessMessage(data.message);
        // Pas besoin de réinitialiser le cookie ici car il est géré par le serveur
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setErrorMessage(errorData.errors);
      }
    } catch (error) {
      console.error("Erreur lors de la modification du mot de passe :", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="update-password-form">
        <div className="form-group">
          <label htmlFor="currentEmail">Ancien mot de passe</label>
          <input
            value={formData.currentEmail}
            onChange={handleChange}
            type="text"
            name="currentEmail"
            id="currentEmail"
            placeholder="Ancien mot de passe"
            required
          />
          <span className="error">{errorMessage.currentEmail}</span>
        </div>

        <div className="form-group">
          <label htmlFor="newEmail">Nouveau mot de passe</label>
          <input
            value={formData.newEmail}
            onChange={handleChange}
            type="text"
            name="newEmail"
            id="newEmail"
            placeholder="Nouveau mot de passe"
            required
          />
          <span className="error">{errorMessage.newEmail}</span>
        </div>

        <div className="form-group">
          <label htmlFor="confirmNewEmail">
            Confirmer le nouveau mot de passe
          </label>
          <input
            value={formData.confirmNewEmail}
            onChange={handleChange}
            type="text"
            name="confirmNewEmail"
            id="confirmNewEmail"
            placeholder="Confirmer le nouveau mot de passe"
            required
          />
          <span className="error">{errorMessage.confirmNewEmail}</span>
        </div>

        <button type="submit">Modifier mon mot de passe</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}
