// Composant de ligne d'utilisateur (UserRow.js)
import { useState } from "react";

export default function UserRow({ user, handleDeleteUser }) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  return (
    <tr key={user._id}>
      <td>
        <button onClick={() => setConfirmationVisible(true)}>
          Supprimer
        </button>
      </td>
      {confirmationVisible && (
        <td>
          <div className="confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <button onClick={() => handleDeleteUser(user._id)}>
              Oui
            </button>
            <button onClick={() => setConfirmationVisible(false)}>Non</button>
          </div>
        </td>
      )}
    </tr>
  );
}
