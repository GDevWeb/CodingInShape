import { useEffect, useState } from 'react';
import './SignUpForm.scss';

export default function SignUpForm() {

  const [formData, setFormData] = useState({
    firstName : '',
    lastName : '',
    pseudo : '',
    email : '',
    password : '',
    isAdmin : false,
    isBan : false,
  })

  const handleChange = (e) => {
    const {firstName, lastName, pseudo, email, password, isAdmin, isBan} = e.target.value;
    setFormData({
      ...formData,
      [firstName] : firstName,
      [lastName] : lastName,
      [pseudo] : pseudo,
      [email] : email,
      [password] : password,
      [isAdmin] : isAdmin,
      [isBan] : isBan,
    })
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(formData);

    fetch('http://localhost:4000/api/auth/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

  }

  return (
    <form onSubmit={handleSubmit} className='formRegister'>

      <div className="formRegister__container">


    <h2>Créer un compte :</h2>


    <div className="form-group-one">

    <div className="form-group">
    <label htmlFor="name">Nom :</label>
    <input 
    value={formData.lastName}
    onChange={handleChange}
    type="text" 
    name="lastName" 
    id="lastName" 
    placeholder="Votre nom" 
    required />
    </div>

    <div className="form-group">
    <label htmlFor="firstName">Prénom :</label>
    <input 
    value={formData.firstName}
    onChange={handleChange}
    type="text" 
    name="firstName" 
    id="firstName" 
    placeholder="Votre prénom" 
    required />
    </div>

    <div className="form-group">
    <label htmlFor="pseudo">Pseudo :</label>
    <input 
    value={formData.pseudo}
    onChange={handleChange}
    type="text" 
    name="pseudo" 
    id="pseudo" 
    placeholder="Votre pseudo" 
    required />
    </div>

    </div>
    {/* end form(group-one ) */}


    {/* confirm password : */}
    <div className="form-group-two">
      

    <div className="form-group">
    <label htmlFor= "password">Mot de passe: </label>
    <p>(entre 8 et 12 caractères 1 majuscule, 1 chiffre et 1 caractère spécial requis) :</p>
    <input 
    value={formData.password}
    onChange={handleChange}
    type="password" 
    name=" password" 
    id="password" 
    placeholder="votre pseudo" 
    required />
    </div>

    <div className="form-group">
    <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
    <input 
    type="password" 
    name="confirmPassword" 
    id="confirmPassword" 
    placeholder="Votre mot de passe" 
    required />
    </div>

    <div className="form-group">
    <label htmlFor="email">Votre email</label>
    <input 
    value={formData.email}
    onChange={handleChange}
    type="email" 
    name="email" 
    id="email" 
    placeholder="Votre email" 
    required />
    </div>

    <div className="form-group">
    <label htmlFor="confirmEmail">Confirmer votre email</label>
    <input 
    type="email" 
    name="confirmEmail" 
    id="confirmEmail" 
    placeholder="Votre email" 
    required />
    </div>
</div>

    <button type="submit">Se connecter</button>
      </div>
    </form>
  )
}
