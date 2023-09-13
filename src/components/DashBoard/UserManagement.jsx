import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRow from "./UserRow";
import "../../../src/main.scss";

// Composants locaux :
import Spinner from "../../assets/icons/spinner.svg";

// Constantes et variables :
import {
  USERS_API,
  BAN_USER_API,
  UNBAN_USER_API,
  ADMIN_USER_API,
} from ".././api";
import { set } from "mongoose";

export default function UserManagement(toggleUpdate) {
  const [usersData, setUsersData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(true);
  const [updatedList, setUpdatedList] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(USERS_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsersData(data);
          setIsLoading(false);
          setSuccessMessage("Données des utilisateurs récupérées avec succès");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          console.error(
            "Impossible de récupérer les données des utilisateurs. Statut HTTP :",
            response.status
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des utilisateurs :",
          error
        );
        setIsLoading(false);
        setServerErrors(
          "Erreur lors de la récupération des données des utilisateurs"
        );
      }
    };
    fetchUsersData();
  }, [navigate, toggleUpdate]);

  // Méthode pour mettre à jour le statut administrateur
  const handleAdminChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Méthode pour passer un utilisateur en administrateur ou retirer les droits admin :
      const response = await fetch(ADMIN_USER_API(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Statut administrateur mis à jour avec succès");
        setSuccessMessage("Statut administrateur mis à jour avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        );
        setUsersData(updatedUsersData);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error(
          "Impossible de mettre à jour le statut administrateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de mettre à jour le statut administrateur");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut administrateur :",
        error
      );
      setServerErrors("Impossible de mettre à jour le statut administrateur");
    }
  };

  // Méthode pour bannir un utilisateur
  const handleBanChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Méthode pour bannir un utilisateur :
      const response = await fetch(BAN_USER_API(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Utilisateur banni avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId ? { ...user, isBan: true } : user
        );
        setSuccessMessage("Utilisateur banni avec succès");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setUsersData(updatedUsersData);
      } else {
        console.error(
          "Impossible de bannir l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de bannir l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors du bannissement de l'utilisateur :", error);
      setServerErrors("Erreur lors du bannissement de l'utilisateur");
    }
  };

  // Méthode pour réhabiliter un utilisateur :
  const handleUnbanChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(UNBAN_USER_API(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        console.log("Utilisateur débanni avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId ? { ...user, isBan: false } : user
        );
        setUsersData(updatedUsersData);
        setSuccessMessage("Utilisateur débanni avec succès");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error(
          "Impossible de débannir l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de débannir l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors du débannissement de l'utilisateur :", error);
      setServerErrors("Impossible de débannir l'utilisateur");
    }
  };

  // Méthode pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Méthode pour supprimer un utilisateur :
      const response = await fetch(
        `http://localhost:4000/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Utilisateur supprimé avec succès");
        const updatedUsersData = usersData.filter(
          (user) => user._id !== userId
        );
        setSuccessMessage("Utilisateur supprimé avec succès");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setUsersData(updatedUsersData);
        setUserToDelete(null);
        setConfirmationVisible(false);
      } else {
        console.error(
          "Impossible de supprimer l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de supprimer l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setServerErrors("Impossible de supprimer l'utilisateur");
    }
  };

  return (
    <>
      <h1>Gestion des utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre d'utilisateurs</th>
            <th>Nombre d'utilisateurs connectés</th>
            <th>Nombre d'Administrateurs</th>
            <th>Nombre d'Administrateurs connectés</th>
            <th>Nombre d'utilisateurs Bannis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{usersData.length}</td>
            <td>À venir</td>
            <td>{usersData.filter((user) => user.isAdmin).length}</td>
            <td>À venir</td>
            <td>{usersData.filter((user) => user.isBan).length}</td>
          </tr>
        </tbody>
      </table>
      <h2>Liste des utilisateurs :</h2>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Administrateur</th>
            <th>Banni</th>
            <th>Actions</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                handleAdminChange={handleAdminChange}
                handleBanChange={handleBanChange}
                handleUnbanChange={handleUnbanChange}
                handleDeleteUser={handleDeleteUser}
              />
            ))}
        </tbody>
      </table>
      {isLoading && <img src={Spinner} alt="Chargement en cours" />}
      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="server-error">
        {serverErrors && <p>{serverErrors}</p>}
      </div>
    </>
  );
}
