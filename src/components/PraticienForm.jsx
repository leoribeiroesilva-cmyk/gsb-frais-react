import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/authservice";
import { useAuth } from "../context/AuthContext";
import '../styles/FraisForm.css';

const PraticienForm = ({ initialData, id }) => {
    const { token } = useAuth();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [ville, setVille] = useState('');
    const [coefNotoriete, setCoefNotoriete] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Pré-remplir les champs en cas d'édition
    useEffect(() => {
        if (initialData) {
            setNom(initialData.nom || '');
            setPrenom(initialData.prenom || '');
            setAdresse(initialData.adresse || '');
            setCodePostal(initialData.codePostal || '');
            setVille(initialData.ville || '');
            setCoefNotoriete(initialData.coefNotoriete || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!token) throw new Error('token manquant');
            const praticienData = {
                nom,
                prenom,
                adresse,
                codePostal,
                ville,
                coefNotoriete
            };
            
            if (initialData && id) {
                // Modification
                praticienData.id_praticien = id; // Ajoute l'identifiant du praticien à modifier
                await axios.post(`${API_URL}praticien/modifier`, praticienData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            } else {
                // Ajout
                await axios.post(`${API_URL}praticiens/ajout`, praticienData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            }
            navigate('/praticiens');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className="frais-form" onSubmit={handleSubmit}>
            <div className="form-group">
                {error && <p className="error">{error}</p>}
                <label htmlFor="nom">Nom :</label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="prenom">Prénom :</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="adresse">Adresse :</label>
                <input
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="codePostal">Code Postal :</label>
                <input
                    type="text"
                    id="codePostal"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="ville">Ville :</label>
                <input
                    type="text"
                    id="ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="coefNotoriete">Coefficient de Notoriété :</label>
                <input
                    type="number"
                    id="coefNotoriete"
                    value={coefNotoriete}
                    onChange={(e) => setCoefNotoriete(e.target.value)}
                    required
                    step="0.01"
                />
             </div>
            <button type="submit" disabled={loading}>
                {loading ? "En cours..." : initialData ? "Mettre à jour" : "Ajouter"}
            </button>
        </form>
    );
}

export default PraticienForm;