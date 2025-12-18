import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../services/authservice';
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { useAuth } from '../context/AuthContext'; // Ajout de l'import

function FraisHorsForfaitAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); // Récupération du token

  const handleAdd = async (data) => {
    await axios.post(
      `${API_URL}fraisHF/ajouter/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    navigate(`/frais/${id}/hors-forfait`);
  };

  return <FraisHorsForfaitForm idFrais={id} onSubmit={handleAdd} />;
}

export default FraisHorsForfaitAdd;

