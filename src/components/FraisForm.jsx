import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../services/authservice';
import '../styles/FraisForm.css';

const FraisForm = () => {
  const { user, token } = useAuth();
  const [anneemois, setAnneemois] = useState('');
  const [nbjustificatifs, setNbjustificatifs] = useState('');
  const [montantsaisi, setMontantsaisi] = useState('');
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
        anneemois,
        nbjustificatifs: parseInt(nbjustificatifs, 10),
        montantsaisi: parseFloat(montantsaisi),
        id_visiteur: user.id_visiteur,
      };
      await axios.post(`${API_URL}frais/ajout`, fraisData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      navigate('/dashboard'); // Redirige vers le tableau de bord après l'ajout
    } catch (error) {
      console.error('Erreur', error);
      setError(error.response?.data?.message || error.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="frais-form-container">
      <h2>Formulaire de Frais</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit} className="frais-form">
        <div className="form-group">
          <label >AnnéeMois</label>
          <input
            type="text"
            name="anneemois"
            value={anneemois}
            onChange={e => setAnneemois(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de Justificatifs</label>
          <input
            type="number"
            name="nbjustificatifs"
            min="0"
            value={nbjustificatifs}
            onChange={e => setNbjustificatifs(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Montant Saisi (€)</label>
          <input
            type="number"
            name="montantsaisi"
            min="0"
            step="0.01"
            value={montantsaisi}
            onChange={e => setMontantsaisi(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default FraisForm;
