// si l'utilisateur est connecté, afficher des informations supplémentaires
// sinon l'envoyer à se connecter
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FraisTable from '../components/FraisTable'; // Ajoutez cette ligne

function Dashboard(){
    const { user } = useAuth();
    
    return(
        <div>
            <h1>Tableau de bord</h1>
            {user ? (
                <p>Bienvenue {user.login}!</p>
            ) : (
                <Link to="/login">Se connecter</Link>
            )}
                <FraisTable /> {/* Le composant est déjà utilisé ici */}
        </div>
    );
}

export default Dashboard;