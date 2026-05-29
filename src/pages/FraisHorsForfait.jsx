import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../services/authservice';
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";
import '../styles/FraisHorsForfait.css'
import { useAuth } from '../context/AuthContext'; // <-- Correction ici

function FraisHorsForfait() {
  const { id } = useParams();
  const { token } = useAuth();
  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFraisHorsForfaitList();
  }, []);

  const fetchFraisHorsForfaitList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Données des frais hors forfait récupérées :", data);
      setFraisHorsForfaitList(data);
      setLoading(false);
 let somme = 0;
      data.forEach((f) => {
        somme += parseFloat(f.montant_fraishorsforfait);
      });
      setTotal(somme);
    } catch (error) {
      setError("Erreur lors de la récupération des frais hors forfait.");
      console.error("Erreur API :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idHF) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce frais hors forfait ?")) return;
    try {
      await axios.delete(`${API_URL}fraisHF/suppr/`, {
        data: { id_fraisHF: idHF },
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFraisHorsForfaitList();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div>
      <h2>Frais hors forfait</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <FraisHorsForfaitTable
          frais={fraisHorsForfaitList}
          total={total}
          idFrais={id}
          onDelete={handleDelete}
        />
      )}
      <Link to={`/frais/${id}/hors-forfait/ajouter`}>Ajouter</Link>
      <br />
    </div>
  );
}

export default FraisHorsForfait;