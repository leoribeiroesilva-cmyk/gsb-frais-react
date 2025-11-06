import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className='Navbar'>
            <div className='Navbar-left'>
                <span>GSB Frais</span>
                <Link to="/">Accueil</Link>
                <Link to="/dashboard" >Tableau de bord</Link>
            </div>
            <div className='Navbar-right'>
                <Link to="">Déconnexion</Link>
                <Link to="/login">Connexion</Link>
            </div>
        </nav>
    )
}
export default Navbar;