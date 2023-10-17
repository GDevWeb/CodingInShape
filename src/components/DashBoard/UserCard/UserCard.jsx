import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./UserCard.scss";

export default function UserCard({
  user,
  handleAdminChange,
  handleBanChange,
  handleUnbanChange,
  handleDeleteUser,
  showConfirmation,
  confirmationVisible,
  hideConfirmation,
}) {
  return (
    <div className="user-card" key={user._id}>
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
      </div>

      <div className="isAdmin">
        <div className="switch">
          <p>{user.isAdmin ? "Admin" : "User"}</p>
          <button type="button" onClick={() => handleAdminChange(user._id)}>
            {user.isAdmin ? "Oui" : "Non"}
          </button>
        </div>
      </div>

      <div>
        <div className="switch">
          <p>{user.isBan ? "Oui" : "Non"}</p>
          <button
            type="button"
            onClick={() =>
              user.isBan
                ? handleUnbanChange(user._id)
                : handleBanChange(user._id)
            }
          >
            {user.isBan ? "Débannir" : "Bannir"}
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="delete-button"
        >
          Oui
        </button>
        <button onClick={hideConfirmation} className="modify-button">
          Non
        </button>
        <Link to={`/update-user/${user._id}`}>
          <button className="modify-button">Modifier</button>
        </Link>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  handleAdminChange: PropTypes.func.isRequired,
  handleBanChange: PropTypes.func.isRequired,
  handleUnbanChange: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};
