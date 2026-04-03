import { Link } from "react-router-dom";
import PraticienForm from "../components/PraticienForm";
import { useAuth } from "../context/AuthContext";

const PraticienAdd = () => {
    const { user } = useAuth();

    if (!user) {
        return <Link to="/login" />;
    }

    return (
        <div>
            <h2>Ajouter un praticien</h2>
            <PraticienForm />
        </div>
    );
};

export default PraticienAdd;
