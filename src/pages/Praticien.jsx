import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PraticienTable from "../components/PraticienTable";

function Praticien() {
    const { user } = useAuth();
    return (
        <div>
            <h1>Liste des praticiens</h1>
            {user ? (
                <p>Bienvenue {user.login}!</p>
            ) : (
                <Link to="/login">Se connecter</Link>
            )}
            {user && (
                <PraticienTable /> 
            )}
        </div>
    );
}

export default Praticien;