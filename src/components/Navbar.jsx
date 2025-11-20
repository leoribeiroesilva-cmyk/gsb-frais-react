import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logoutUser } = useAuth();

    return (
        <nav className='Navbar'>
            <div className='Navbar-left'>
                <span>GSB Frais</span>
                <Link to="/">Accueil</Link>
                <Link to="/dashboard" >Tableau de bord</Link>
                <Link to="/frais/ajout" >Ajouter un frais</Link>
            </div>
            <div className='Navbar-right'>
                {user ? (
                    <>
                        <button onClick={logoutUser} style={{ color: 'white', background: 'none', border: 'none',}}>Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login">Connexion</Link>
                )}
            </div>
        </nav>
    )
}
export default Navbar;