import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/authservice';
import '../styles/FraisForm.css';

const FraisHorsForfaitForm = ({ initialData, idFrais, idHF }) => {
    const { token } = useAuth();
    const [date, setDate] = useState('');
    const [montant, setMontant] = useState('');
    const [libelle, setLibelle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!token) throw new Error('token manquant');
            const fraisData = {
                date: date,
                montant: parseFloat(montant),
                libelle: libelle,
            };
            if (initialData && idFrais && idHF) {
                // Modification
                fraisData.id_fraisHF = initialData.id_fraishorsforfait; // Ajoute l'identifiant du hors forfait à modifier
                console.log("Données à envoyer pour modification :", fraisData);
                await axios.post(`${API_URL}fraisHF/modif`, fraisData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            } else {
                // Ajout
                fraisData.id_frais = idFrais; // Ajoute l'identifiant du frais parent pour l'ajout
                console.log("Données à envoyer pour ajout :", fraisData);
                await axios.post(`${API_URL}fraisHF/ajout`, fraisData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            }
            navigate(`/frais/${idFrais}/hors-forfait`);
        } catch (e) {
            console.error('Erreur', e);
            setError(e.response?.data?.message || e.message || 'Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    };

    // en cas d'edit , remplir les champs avec les données initiales
    useEffect(() => {
        if (initialData) {
            setDate(initialData.date_fraishorsforfait || '');
            setMontant(initialData.montant_fraishorsforfait || '');
            setLibelle(initialData.libelle_fraishorsforfait || '');
        }
    }, [initialData]);

    return (
        <div className='frais-form-container'>
            <h2>Formulaire de Frais</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit} className='frais-form'>
                <div className='form-group'>
                    <label>Date</label>
                    <input type='text' name='date' value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label>Montant (€)</label>
                    <input
                        type='number'
                        name='montant'
                        min="0"
                        step='0.01'
                        value={montant}
                        onChange={e => setMontant(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Libelle</label>
                    <input
                        type='text'
                        name='libelle'
                        value={libelle}
                        onChange={e => setLibelle(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? "Enregistrement..." : (initialData ? "Mettre à jour le hors forfait" : "Ajouter un hors forfait")}
                </button>
            </form>
        </div>
    );
};

export default FraisHorsForfaitForm;