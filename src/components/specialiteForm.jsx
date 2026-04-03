import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/authservice";
import '../styles/PraticienForm.css';

const SpecialiteForm = ({ initialData, id, idPraticien }) => {
    const { user, token } = useAuth();
    const [specialite, setSpecialite] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!token) throw new Error('token manquant');
            const specialiteData = {
                specialite: specialite
            };
            if (initialData && id && idPraticien) {
                // Modification
                specialiteData.id_specialite = id; // Ajoute l'identifiant de la spécialité à modifier
                await axios.post(`${API_URL}specialites/modif`, specialiteData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            } else {
                // Ajout
                await axios.post(`${API_URL}specialites/ajout`, specialiteData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            }
            // API a mettre plus tard
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // en cas d'edit , remplir les champs avec les données initiales
    useEffect(() => {
        if (initialData) {
            setSpecialite(initialData.specialite || '');
        }    }, [initialData]);

    navigate('/praticiens');
    return (
        <div className="PraticienForm">
            <h2>{initialData ? 'Modifier la spécialité' : 'Ajouter une spécialité'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="specialite">Spécialité :</label>
                <input
                    type="text"
                    id="specialite"
                    value={specialite}
                    onChange={(e) => setSpecialite(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Soumettre'}
                </button>
            </form>
        </div>
    );
};

export default SpecialiteForm;