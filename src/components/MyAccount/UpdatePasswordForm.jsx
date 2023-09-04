import { useState } from "react";

export default function UpdatePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Gestion des messages d'erreurs :
  const [errorMessage, setErrorMessage] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    if (name === "currentPassword") {
      const regexPassword = /^.{8,}$/; // Au moins 8 caractères
      const testPassword = regexPassword.test(value);
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        currentPassword: testPassword
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }

    if (name === "newPassword") {
      const regexPassword = /^.{8,}$/; // Au moins 8 caractères
      const testPassword = regexPassword.test(value);
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        newPassword: testPassword
          ? ""
          : "Le mot de passe doit contenir au moins 8 caractères",
      }));
    }

    if (name === "confirmNewPassword") {
      const testNewPasswordConfirm = value === formData.newPassword;

      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: testNewPasswordConfirm
          ? ""
          : "Les mots de passe ne correspondent pas",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    };

    try {
      // Lecture du cookie "token"
      const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;
            console.log("Token obtenu :", token);

      const response = await fetch(
        "http://localhost:4000/api/auth/updatePassword",
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
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
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
          <label htmlFor="currentPassword">Ancien mot de passe</label>
          <input
            value={formData.currentPassword}
            onChange={handleChange}
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Ancien mot de passe"
            required
          />
          <span className="error">{errorMessage.currentPassword}</span>
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input
            value={formData.newPassword}
            onChange={handleChange}
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Nouveau mot de passe"
            required
          />
          <span className="error">{errorMessage.newPassword}</span>
        </div>

        <div className="form-group">
          <label htmlFor="confirmNewPassword">
            Confirmer le nouveau mot de passe
          </label>
          <input
            value={formData.confirmNewPassword}
            onChange={handleChange}
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirmer le nouveau mot de passe"
            required
          />
          <span className="error">{errorMessage.confirmNewPassword}</span>
        </div>

        <button type="submit">Modifier mon mot de passe</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}
