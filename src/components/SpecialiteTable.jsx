// cette table affiche les spécialités d'un praticien
import React from "react";
import { Link } from "react-router-dom";
import '../styles/PraticienTable.css'

export default function SpecialiteTable({ specialites }) {
    return (
        <div className="SpecialiteTable">
            <h2>Spécialités</h2>
            <table>
                <thead>
                    <tr>
                        <th>Spécialité</th>
                    </tr>
                </thead>
                <tbody>
                    {specialites.map((s, index) => (
                        <tr key={index}>
                            <td>{s.specialite}</td>
                            <td>
                                <Link to={`/praticiens/${idPraticien}/specialites/modifier/${s.id_specialite}`}>
                                    Modifier
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => onDelete(s.id_specialite)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}