import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import { API_URL } from '../services/authservice';

const FraisHorsForfaitEdit = () => {
    const { id , idHF } = useParams();
    const [fraisData, setFraisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("idFrais:", id, "idHF:", idHF);
    useEffect(() => {
        const fetchFraisData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}fraisHF/${idHF}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFraisData(response.data);
            } catch (error) {
                setError("Erreur lors de la récupération des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchFraisData();
    }, [id , idHF]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{fraisData ? `Modifier le frais` : "Ajouter un frais"}</h1>
            <FraisHorsForfaitForm initialData={fraisData}  idFrais={id} idHF={idHF} />
        </div>
    );
};

export default FraisHorsForfaitEdit;
