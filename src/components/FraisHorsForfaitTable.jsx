// prend deux props : id du frais et la liste des frais hors forfait
// Ce composant n'implémente pas d comportement car tout est géré dans le composant parent FraisHorsForfait.jsx
// il gère uniquement l'affichage
import React from "react";
import { Link } from "react-router-dom";
import '../styles/FraisTable.css'

export default function FraisHorsForfaitTable({ frais, total, idFrais, onDelete }) {
  return (
    <table className="frais-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Libellé</th>
          <th>Montant (€)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {frais.map((f) => (
          <tr key={f.id_fraishorsforfait}>
            <td>{f.date_fraishorsforfait}</td>
            <td>{f.lib_fraishorsforfait}</td>
            <td>{f.montant_fraishorsforfait}</td>
            <td>
              <Link to={`/frais/${idFrais}/hors-forfait/modifier/${f.id_fraishorsforfait}`}>
                Modifier
              </Link>
              <button onClick={() => onDelete(f.id_fraishorsforfait)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">Total</td>
          <td>{total} €</td>
        </tr>
      </tfoot>
    </table>
  );
}

