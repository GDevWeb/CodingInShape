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

  <div className="form-group">
    <label htmlFor="securityQuestion">Question secrète :</label>
    <select name="securityQuestion" 
    id="securityQuestion">
      <option value="0">Choisissez votre question secrète</option>
      <option value="nomAnimal">Quel est le nom de votre premier animal de compagnie ?</option> 
      <option value="nomMere">Quel est le nom de jeune fille de votre mère ?</option>
      <option value="villeNatale">Quel est le nom de votre ville natale ?</option>
      <option value="seriePreferee">Quelle est votre série préférée ?</option>
    </select>
  </div>

  <div className="form-group">
  <label htmlFor="securityAnswer">Réponse à la question secrète :</label>
  <input type="text" name="securityAnswer" id="securityAnswer" placeholder="Votre réponse" required />
  </div>

  </div>


  <button type="submit">Se connecter</button>
    </div>
  </form>

  )
}
