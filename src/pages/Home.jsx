<<<<<<< HEAD
import React from 'react'
import Welcome from '../components/Welcome/Welcome';
=======
import { Link } from 'react-router-dom'
>>>>>>> devPullMe

export default function Home() {
  return (
    <div className='welcome'>

      {/* <h2 className='title'>Coding in Shape</h2>
    <p>

      Bienvenue sur la page d'accueil de l'application de Coding In Shape !

    </p>
    <p>
      Votre partenaire fit et bien être !
    </p>

<<<<<<< HEAD
    <p>Pour accéder au contenu de l'application, veuillez vous connecter </p> */}
    <Welcome />
=======
    <p>Pour accéder au contenu de l'application, veuillez  
      
      <Link to="/login" className='linkTo'> vous connecter</Link>
       </p>

>>>>>>> devPullMe
    </div>
  )
}
