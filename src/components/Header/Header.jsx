import logo from '../../assets/logos/logo.png';
import { Link} from 'react-router-dom';
import LogoutButton from '../LogOutButton/LogoutButton';
import LoginForm from '../LoginForm/LoginForm';

export default function Header() {

  
  return (
    <header className='box'>
<div className="logo">
<Link to="/" className="logo-link">
  <figure>
    <img src={logo} alt="logo coding in shape" />
  </figure>
  <h1 className="title">Coding in Shape</h1>
</Link>
</div>

<LogButton/>

    </header>
  )
}
