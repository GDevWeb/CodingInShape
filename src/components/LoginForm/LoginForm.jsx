import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/Slices/authSlice';
import './LoginForm.scss';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

    // Pour gérer le message de succès si tous les inputs sont valides :
    const [success, setSuccess] = useState("Connexion réussie");

    // Pour gérer les messages d'erreurs dans le formulaire selon l'input :
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });
  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  
      // Vérifications des inputs :
      // Vérification de l'email :
      if (name === "email") {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const testEmail = regexEmail.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: testEmail ? "" : "L'email n'est pas valide",
        }));
      }
  
      // Vérification du mot de passe :
      if (name === "password") {
        const regexPassword = /^.{8,}$/; // Au moins 8 caractères
        const testPassword = regexPassword.test(value);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: testPassword
            ? ""
            : "Le mot de passe doit contenir au moins 8 caractères",
        }));
      }
    };
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        console.log(navigate('/myaccount'))
        navigate('/myaccount');
        console.log(navigate('/myaccount'))
        // Envoyez le token au slice Redux
        dispatch(loginSuccess(data.token));

        setFormData({
          email: '',
          password: '',
        });

      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      <div className="LoginForm__container">
        <h2>Se connecter :</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Mot de passe</label>
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <span className="error">{errors.password}</span>
        </div>
        <p className="recupPassword">
          <Link  to="/forgotten" className="forgottenPasswordLink">
            mot de passe oublié ?
          </Link>
        </p>

        <button type="submit">Se connecter</button>

        <p className="invitCreateAccount">
          Pas encore de compte ?
          <Link className="createAccountLink" to="/signup">
            {" "}
            Créer un compte
          </Link>

        </p>
      </div>
    </form>
  );
}
