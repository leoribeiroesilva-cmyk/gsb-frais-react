import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FraisForm from "../components/FraisForm";
import { API_URL } from '../services/authservice';


const FraisEdit = () => {
    const { id } = useParams();
    const [fraisData, setFraisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les données du frais à éditer
    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}frais/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFraisData(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération des données du frais.");
            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!fraisData) return null;

    return (
        <div>
            <h2>{fraisData ? "Modifier un frais" : "Saisir un frais"}</h2>
            <FraisForm initialData={fraisData} id={id}/>
        </div>
    );
};

export default FraisEdit;