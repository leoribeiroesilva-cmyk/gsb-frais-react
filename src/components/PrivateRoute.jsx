import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { token, loading } = useAuth();

    if (loading) {
        // Afficher un indicateur de chargement pendant la vérification de l'authentification
        return <div>Chargement...</div>;
    }
    if (!token) {
        // utilisateur non authentifié, rediriger vers la page de connexion
        return <Link to="/login" replace />;
    }
    // utilisateur authentifié, rendre les enfants
    return children;
}

export default PrivateRoute;