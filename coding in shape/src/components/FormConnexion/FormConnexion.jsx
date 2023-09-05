import React from 'react'
import './FormConnexion.scss';
import { Link } from 'react-router-dom';

export default function FormConnexion() {
  return (
    <form className='formConnexion'>

      <div className="formConnexion__container">


    <h2>Se connecter :</h2>


    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" name="email" id="email" placeholder="Votre email" required />
    </div>

    <div className="form-group">
    <label htmlFor="password">Mot de passe</label>
    <input type="password" name="password" id="password" placeholder="Votre mot de passe" required />
      
      <p className="recupPassword">
      <Link className='forgottenPasswordLink' to="/forgotten">Mot de passe oublié ?</Link>
      </p>

    </div>

    <button type="submit">Se connecter</button>

    <p className='invitCreateAccount'>Pas encore de compte ?  
    <Link className='createAccountLink' to="/register" > Créer un compte</Link>
    </p>
      </div>
    </form>

  )
}
