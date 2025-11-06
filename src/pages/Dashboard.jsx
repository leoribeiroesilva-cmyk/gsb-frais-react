// si l'utilisateur est connecté, afficher des informations supplémentaires
// sinon l'envoyer à se connecter
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Dashboard(){
    const { user } = useAuth();

    if (!user) {
        // utilisateur non authentifié, rediriger vers la page de connexion
        return <Link to="/login">Se connecter</Link>;
    }

    return(
        <div>
            <h1>Tableau de bord</h1>
            {user && <p>Bienvenue {user.login}!</p>}
        </div>
    );
}

export default Dashboard;