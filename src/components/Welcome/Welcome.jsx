import { Link } from "react-router-dom"
import './Welcome.scss';

export default function Welcome() {
  return (
    <div className='welcomePage'>
    <div className="welcomeTitle">

      <h1>Coding In Shape !</h1>
      <h2>La plateforme qui prend soin de vous</h2>
    </div>

    <p>Bienvenue sur notre site dédié à votre bien-être au bureau ! En tant que développeur web, vous savez à quel point les longues heures devant l'ordinateur peuvent être éprouvantes pour votre corps. Nous sommes là pour vous offrir des conseils posturaux simples et des exercices de quelques minutes qui vous aideront à soulager les tensions musculaires, à améliorer votre posture et à augmenter votre productivité.
    </p>
    
    <div className="buttons">
    <Link className='createAccountLink' to="/signup" > Créer un compte</Link>
    <Link className='FormConnexion' to="/login" > Se connecter</Link>
    </div>
  </div>  
  )
}
