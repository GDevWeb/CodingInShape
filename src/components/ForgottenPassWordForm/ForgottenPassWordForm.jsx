import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgottenPassWordForm.scss";

export default function ForgottenPassWordForm() {
  const [formData, setFormData] = useState({
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = regexEmail.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: testEmail ? "" : "L'email n'est pas valide",
      }));
    }

    if (name === "securityQuestion") {
      const testSecurityQuestion = value !== "0";
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityQuestion: testSecurityQuestion
          ? ""
          : "La question secrète n'est pas valide",
      }));
    }

    if (name === "securityAnswer") {
      const regexSecurityAnswer = /\S+/;
      const testSecurityAnswer = regexSecurityAnswer.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        securityAnswer: testSecurityAnswer
          ? ""
          : "La réponse à la question secrète n'est pas valide",
      }));
    }
  };

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      formData.email &&
      formData.securityQuestion &&
      formData.securityAnswer &&
      Object.values(errors).every((error) => error === "");

    if (!isValid) {
      setSuccess("");
      return;
    }

    setSuccess("");
    const requestData = {
      email: formData.email,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setGeneratedPassword(data.sendResetPassword);
        setSuccess("Mot de passe réinitialisé !");
        setPasswordReset(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      setSuccess("Une erreur est survenue, veuillez réessayer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formForgotten">
      <div className="formRegister__container">
        <h2>Récupération du mot de passe :</h2>
        <div className="form-group-one">
          <div className="form-group">
            <label htmlFor="email">Votre email :</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Votre email"
              required
            />
            <span className="error">{errors.email}</span>
          </div>

          <div className="form-group">
            <label htmlFor="securityQuestion">Question secrète :</label>
            <select
              value={formData.securityQuestion}
              onChange={handleChange}
              name="securityQuestion"
              id="securityQuestion"
            >
              <option value="0">Choisissez votre question secrète</option>
              <option value="nomAnimal">
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
            <span className="error">{errors.securityQuestion}</span>
          </div>

          <div className="form-group">
            <label htmlFor="securityAnswer">Votre réponse :</label>
            <input
              value={formData.securityAnswer}
              onChange={handleChange}
              type="text"
              name="securityAnswer"
              id="securityAnswer"
              placeholder="Votre réponse"
            />
            <span className="error">{errors.securityAnswer}</span>
          </div>
        </div>

        <div className="button">
          <button type="submit">Réinitialiser mot de passe</button>
        </div>
      </div>

      {passwordReset ? (
        <div className="passwordResetSuccess">
          <p>
            Votre nouveau mot de passe est :{" "}
            <span className="generatedPassword">{generatedPassword}</span> copier
            le et connectez vous avec !
          </p>
          <p className="passwordResetSuccess__message">{success}</p>
          <Link to="/login" className="linkTo">
            Se connecter
          </Link>
        </div>
      ) : null}
    </form>
  );
}
