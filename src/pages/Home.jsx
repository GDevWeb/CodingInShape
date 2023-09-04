import React from 'react'
import { Link } from 'react-router-dom'

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

    </div>
  )
}
