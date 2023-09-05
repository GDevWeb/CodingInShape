import React from 'react'
import './Register.scss';

export default function Register() {
  return (
    <form className='formRegister'>

      <div className="formRegister__container">


    <h2>Créer un compte :</h2>


    <div className="form-group-one">

    <div className="form-group">
    <label htmlFor="name">Nom :</label>
    <input type="text" name="name" id="name" placeholder="Votre nom" required />
    </div>

    <div className="form-group">
    <label htmlFor="firstName">Prénom :</label>
    <input type="text" name="firstName" id="firstName" placeholder="Votre prénom" required />
    </div>

    <div className="form-group">
    <label htmlFor="pseudo">Pseudo :</label>
    <input type="text" name="pseudo" id="pseudo" placeholder="Votre pseudo" required />
    </div>

    </div>
    {/* end form(group-one ) */}


    {/* confirm password : */}
    <div className="form-group-two">
    

    <div className="form-group">
    <label htmlFor= "password">Mot de passe : </label>
    <input type="password" name=" password" id="password" placeholder="votre pseudo" required />
    </div>

    <div className="form-group">
    <label htmlFor="confirmPassword">Confirmer mot de passe :</label>
    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Votre mot de passe" required />
    </div>

    <div className="form-group">
    <label htmlFor="email">email :</label>
    <input type="email" name="email" id="email" placeholder="Votre email" required />
    </div>

    <div className="form-group">
    <label htmlFor="confirmEmail">Confirmer email :</label>
    <input type="email" name="confirmEmail" id="confirmEmail" placeholder="Votre email" required />
    </div>
</div>

    <button type="submit">Se connecter</button>
      </div>
    </form>
  )
}
