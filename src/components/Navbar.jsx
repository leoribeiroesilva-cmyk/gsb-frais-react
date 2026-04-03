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
                <Link to="/praticien" >Liste des praticiens</Link>
                
            </div>
            <div className='Navbar-right'>
                {user ? (
                    <>
                        <button onClick={logoutUser} style={{ color: 'white', background: 'none', border: 'none',}}>
                            <Link to="/login">Déconnexion ({user.nom} {user.prenom})</Link>
                            </button>
                    </>
                ) : (
                    <Link to="/login">Connexion</Link>
                )}
            </div>
        </nav>
    )
}
export default Navbar;