// si l'utilisateur est connecté, afficher des informations supplémentaires
// sinon l'envoyer à se connecter
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FraisForm from '../components/FraisForm'; // Assurez-vous d'importer le formulaire de frais


const FraisAdd = () => {
  const { user } = useAuth();

  if (!user) {
    return <Link to="/login" />;
  }

  return (
    <div>
      <h2>Ajouter un Frais</h2>
      <FraisForm />
    </div>
  );
};

export default FraisAdd;
