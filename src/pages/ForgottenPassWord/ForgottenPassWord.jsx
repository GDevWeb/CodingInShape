import React from 'react'

export default function ForgottenPassWord() {
  return (
    <form className='formRegister'>

    <div className="formRegister__container">


  <h2>Récupération du mot de passe :</h2>


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

  <div className="form-group">
  <label htmlFor="email">Votre email :</label>
  <input type="email" name="email" id="email" placeholder="Votre email" required />
  </div>

  </div>
  {/* end form(group-one ) */}


  <button type="submit">Se connecter</button>
    </div>
  </form>

  )
}
