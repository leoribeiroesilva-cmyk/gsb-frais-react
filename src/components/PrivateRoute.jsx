// dans PrivateRoute.jsx utiliser useAuth pour vérifier l'authentification
// si user est défini, rendre les enfants, sinon rediriger vers /login
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        // utilisateur non authentifié, rediriger vers la page de connexion
        return <Navigate to="/login" />;
    }
    // utilisateur authentifié, rendre les enfants
    return children;
}

export default PrivateRoute;