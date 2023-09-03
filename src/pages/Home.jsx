import React from 'react'
<<<<<<< HEAD
import FormLogin from '../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
=======
import FormConnexion from '../components/FormConnexion/FormConnexion'
import TestFetch from './testfetch'
>>>>>>> 813bddeb0ab3aa90775af6a011a2f474c2cd3d8d

export default function Home() {
  return (
    <div className='welcome'>

      <h2 className='title'>Coding in Shape</h2>
    <p>

      Bienvenue sur la page d'accueil de l'application de Coding In Shape !

    </p>
    <p>
      Votre partenaire fit et bien être !
    </p>

    <p>Pour accéder au contenu de l'application, veuillez  
      
      <Link to="/login" className='linkTo'> vous connecter</Link>
       </p>

<<<<<<< HEAD
=======
    <FormConnexion/>

    <TestFetch />
>>>>>>> 813bddeb0ab3aa90775af6a011a2f474c2cd3d8d
    </div>
  )
}
