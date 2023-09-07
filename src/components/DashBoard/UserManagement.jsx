import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";

export default function UserManagement() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:4000/api/admin/users", {
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
      }
    };
    fetchUsersData();
  }, [navigate]);

  // Méthode pour mettre à jour le statut administrateur
  const handleAdminChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Méthode pour passer un utilisateur en administrateur ou retirer les droits admin :
      const response = await fetch(
        `http://localhost:4000/api/admin/users/unadmin/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Statut administrateur mis à jour avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId
            ? { ...user, isAdmin: !user.isAdmin } 
            : user
        );
        setUsersData(updatedUsersData);
      } else {
        console.error(
          "Impossible de mettre à jour le statut administrateur. Statut HTTP :",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut administrateur :",
        error
      );
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
      const response = await fetch(
        `http://localhost:4000/api/admin/users/ban/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Utilisateur banni avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId ? { ...user, isBan: true } : user
        );
        setUsersData(updatedUsersData);
      } else {
        console.error(
          "Impossible de bannir l'utilisateur. Statut HTTP :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors du bannissement de l'utilisateur :", error);
    }
  };

  const handleUnbanChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Méthode pour débannir un utilisateur :
      const response = await fetch(
        `http://localhost:4000/api/admin/users/unban/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Utilisateur débanni avec succès");
        const updatedUsersData = usersData.map((user) =>
          user._id === userId ? { ...user, isBan: false } : user
        );
        setUsersData(updatedUsersData);
      } else {
        console.error(
          "Impossible de débannir l'utilisateur. Statut HTTP :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors du débannissement de l'utilisateur :", error);
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
        setUsersData(updatedUsersData);
        setUserToDelete(null);
        setConfirmationVisible(false);
      } else {
        console.error(
          "Impossible de supprimer l'utilisateur. Statut HTTP :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };


  return (
    <>
      <h1>Gestion des utilisateurs</h1>
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
                    >{user.isAdmin ? "Oui" : "Non"}</button>
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
                  <button
                    onClick={() =>
                      user.isBan
                        ? handleUnbanChange(user._id)
                        : handleBanChange(user._id)
                    }
                    className={user.isBan ? "banned-button" : ""}
                  >
                    {user.isBan ? "Débannir" : "Bannir"}
                  </button>
                </td>
                <td>
                  <button onClick={()=> setUserToDelete(user)}>Supprimer</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Confirmation de suppression de user : */}
    {/* Confirmation de suppression de l'utilisateur */}
    {userToDelete && confirmationVisible && (
        <div className="confirmation">
          <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
          <button onClick={() => handleDeleteUser(userToDelete._id)}>
            Oui
          </button>
          <button onClick={() => setConfirmationVisible(false)}>Non</button>
        </div>
      )}

      <h2>Ajouter un utilisateur :</h2>
      <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? "Annuler" : "Ajouter un utilisateur"}
      </button>
      {showAddUserForm && <AddUser />}
    </>
  );
}

// #Debogage de  suppression d'utilisateur : 
// Si suppr de 1 user le 2nd user ne sera pas supprimé 