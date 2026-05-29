// prend deux props : id du praticien et la liste des spécialités
// Ce composant n'implémente pas d comportement car tout est géré dans le composant parent Praticien.jsx
// il gère uniquement l'affichage
import React from "react";
import { Link } from "react-router-dom";
import '../styles/FraisTable.css'

export default function SpecialisteTable({ specialites, idPraticien }) {
  return (
    <table className="frais-table">
        <thead>
            <tr>
                <th>Libellé de la spécialité</th>
                </tr>
        </thead>
        <tbody>
            {specialites.map((s) => (
                <tr key={s.id_specialite}>
                    <td>{s.lib_specialite}</td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}