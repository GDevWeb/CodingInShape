import FormLogin from '../components/LoginForm/LoginForm'
import '../../sass/pages.scss'

export default function Login() {
  return (
   <div className='loginTitle'>
   <h1>Page de connexion :</h1>
    <p className='invitToConnect'>Connectez-vous pour accéder à votre espace personnel</p>
    <FormLogin/>
   </div>
  )
}
