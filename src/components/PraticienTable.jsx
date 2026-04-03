import React, {useState, useEffect} from "react";
import '../styles/FraisTable.css';
import axios from "axios";
import { API_URL } from "../services/authservice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PraticienTable = () => {
    const [praticiens, setPraticiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPraticiens = async () => {
            try {
                const response = await axios.get(`${API_URL}praticien/liste`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPraticiens(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching praticiens:', error);
                setLoading(false);
            }
        };

        if (user && token) {
            fetchPraticiens();
        }
    }, [user, token]);
    
    if (loading) return <p>Chargement des praticiens...</p>;
    return (
        <div className="frais-table-container">
            <h2>Liste des praticiens</h2>
            <div className="filtre-container">
                <label htmlFor="search">Rechercher par nom ou spécialité :</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Entrez un nom ou une spécialité..."
                />
            </div>
            <table className="frais-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Adresse</th>
                        <th>Code Postal</th>
                        <th>Ville</th>
                        <th>Coefficient de notoriété</th>
                        <th>Spécialité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {praticiens.map((praticienItem) => (
                        <tr key={praticienItem.id_praticien}>
                            <td>{praticienItem.nom_praticien}</td>
                            <td>{praticienItem.prenom_praticien}</td>
                            <td>{praticienItem.adresse_praticien}</td>
                            <td>{praticienItem.cp_praticien}</td>
                            <td>{praticienItem.ville_praticien}</td>
                            <td>{praticienItem.coef_notoriete}</td>
                            <td>{praticienItem.lib_specialite}</td>
                            <td>
                                <button onClick={() => navigate(`/praticien/modifier/${praticienItem.id_praticien}`)}
                                    className="edit-button">
                                    Modifier
                                </button>
                            </td>
                            <td>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PraticienTable;