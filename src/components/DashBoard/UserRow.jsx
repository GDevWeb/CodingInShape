import React, { useState } from "react";

export default function UserRow({
  user,
  handleAdminChange,
  handleBanChange,
  handleUnbanChange,
  handleDeleteUser,
}) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  return (
    <tr key={user._id}>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <label className="switch">
          {user.isAdmin ? <p>Admin</p> : <p>User</p>}
          <button
            type="checkbox"
            onClick={() => handleAdminChange(user._id)}
            onChange={() => handleAdminChange(user._id)}
          >
            {user.isAdmin ? "Oui" : "Non"}
          </button>
          <span className="slider round"></span>
        </label>
      </td>
      <td>
        <label className="switch">
          {user.isBan ? <p>Oui</p> : <p>Non</p>}
          <span className="slider round"></span>
        </label>
      </td>
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
