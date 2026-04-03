import React, { useState, useEffect } from 'react';
import '../styles/FraisTable.css';
import axios from 'axios';
import { API_URL } from '../services/authservice';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FraisTable = () => {
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Ajout de l'état searchTerm
  const [filterNonNull, setFilterNonNull] = useState(true); // Ajout de l'état filterNonNull initialisé à true
  const [minMontantValide, setMinMontantValide] = useState(""); // Nouvel état pour le filtre montant
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await
          axios.get(`${API_URL}frais/liste/${user.idvisiteur}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
        });// requête get à l'API à l'url
        // 'http://gsb.julliand.etu.lmdsio.com/api/frais/liste/{id_visiteur}'
        console.log("Données des frais récupérées :", response.data);
        // TODO : met à jour l'état avec les données de l'API
        setFraisList(response.data);
        // TODO : Met fin à l'état de chargement
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des frais :", error);
        // TODO : Arrête le chargement en cas d'erreur
        setLoading(false);
      }
    };
    if (user && token) {
      fetchFrais(); // Appel de la fonction pour récupérer les données
    }
  }, [user, token]); // Tableau de dépendances vide = exécute une seule fois

  // Logique de filtrage : filtre les frais en fonction du terme de recherche
  const filteredFrais = fraisList
    .filter((f) => !filterNonNull || f.montantvalide !== null) // Filtrer les frais avec montantvalide non null
    .filter((fraisItem) =>
      fraisItem.anneemois.includes(searchTerm) ||
      fraisItem.id_visiteur.toString().includes(searchTerm)
    )
    .filter((fraisItem) =>
      minMontantValide === "" ||
      (fraisItem.montantvalide !== null && Number(fraisItem.montantvalide) > Number(minMontantValide))
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) return;
    try {
      await axios.delete(`${API_URL}frais/suppr`, {
        data: { id_frais: id },
        headers: { Authorization: `Bearer ${token}` },
      });
      // Met à jour Fraislist en ignorant le frais qui a été supprimé : on ne garde que les frais dont l'id est different de l'id du frais supprimé
      setFraisList(fraisList.filter((fraisItem) => fraisItem.id_frais !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du frais :", error);
    }
  };

  if (loading) return <div><b>Chargement des frais...</b></div>;
  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
          />
          Afficher uniquement les frais avec montant validé
        </label>
      </div>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Rechercher par Année-Mois ou ID Visiteur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
       <div className='montant-container'>
        <input
          type="number"
          placeholder="Montant validé supérieur à..."
          value={minMontantValide}
          onChange={(e) => setMinMontantValide(e.target.value)}
          className="search-input"
          min="0"
        />
      </div>
      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de Justificatifs</th>
            <th>Date de Modification</th>
            <th>Montant saisi</th>
            <th>Montant Validé</th>
          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((fraisItem) => (
            <tr key={fraisItem.id_frais}>
              <td>{fraisItem.id_frais}</td>
              <td>{fraisItem.id_etat}</td>
              <td>{fraisItem.anneemois}</td>
              <td>{fraisItem.id_visiteur}</td>
              <td>{fraisItem.nbjustificatifs}</td>
              <td>{fraisItem.datemodification}</td>
              <td>{fraisItem.montantsaisi} €</td>
              <td>{fraisItem.montantvalide} €</td>
              <td>
                <button onClick={() => navigate(`/frais/modifier/${fraisItem.id_frais}`)}
                  className="edit-button"
                >
                  Modifier
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(fraisItem.id_frais)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FraisTable;