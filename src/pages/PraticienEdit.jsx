import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PraticienForm from "../components/PraticienForm";
import { API_URL } from '../services/authservice';

const PraticienEdit = () => {
    const { id } = useParams();
    const [praticienData, setPraticienData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les données du praticien à éditer
    useEffect(() => {
        const fetchPraticien = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}praticien/modifier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPraticienData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPraticien();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!praticienData) return null;

    return (
        <div>
            <h2>{praticienData ? "Modifier un praticien" : "Saisir un praticien"}</h2>
            <PraticienForm initialData={praticienData} id={id} />
        </div>
    );
};

export default PraticienEdit;