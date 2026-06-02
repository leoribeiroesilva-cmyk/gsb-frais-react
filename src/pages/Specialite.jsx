import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authservice";
import { useAuth } from "../context/AuthContext";
import SpecialisteTable from "../components/SpecialiteTable";
import '../styles/FraisHorsForfait.css';

function Specialite() {
    const { id } = useParams();
    const { token } = useAuth();
    const [specialiteList, setSpecialiteList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSpecialiteList();
    }, []);

    const fetchSpecialiteList = async () => {
        try {
            const { data } = await axios.get(`${API_URL}specialite/liste/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSpecialiteList(data);
        } catch (error) {
            setError("Erreur lors de la récupération des spécialités.");
            console.error("Erreur API :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Spécialités du praticien</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <SpecialisteTable specialites={specialiteList} praticienId={id} onUpdate={fetchSpecialiteList} />
            )}
            <Link className='frais-hors-forfait-link' to={`/praticien/${id}/specialite/ajouter`}>
                Ajouter une spécialité
            </Link>
        </div>
    );
}

export default Specialite;