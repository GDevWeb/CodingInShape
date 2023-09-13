import React from "react";
import PropTypes from "prop-types";
import { useDeleteConfirmation } from "../Hooks/useDeleteConfirmation";

export default function UserRow({
  user,
  handleAdminChange,
  handleBanChange,
  handleUnbanChange,
  handleDeleteUser,
}) {
  // Utilise le hook de confirmation de suppression
  const {
    confirmationVisible,
    showConfirmation,
    hideConfirmation,
  } = useDeleteConfirmation();

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
          <button
            type="button"
            onClick={() =>
              user.isBan ? handleUnbanChange(user._id) : handleBanChange(user._id)
            }
            className={user.isBan ? "banned-button" : ""}
          >
            {user.isBan ? "Débannir" : "Bannir"}
          </button>
          <span className="slider round"></span>
        </label>
      </td>
      <td>
        <button onClick={() => showConfirmation(user._id)}>Supprimer</button>
      </td>
      {confirmationVisible && (
        <td>
          <div className="confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <button onClick={() => handleDeleteUser(user._id)}>Oui</button>
            <button onClick={hideConfirmation}>Non</button>
          </div>
        </td>
      )}
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  handleAdminChange: PropTypes.func.isRequired,
  handleBanChange: PropTypes.func.isRequired,
  handleUnbanChange: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};
