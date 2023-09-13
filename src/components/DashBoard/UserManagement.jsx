import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRow from "./UserRow";
import Spinner from '../../assets/icons/spinner.svg'

export default function UserManagement(toggleUpdate) {
  const [usersData, setUsersData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(true);
  const [updatedList, setUpdatedList] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
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
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
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
        setUpdatedList((prev) => prev)
        // const updatedUsersData = usersData.filter(
        //   (user) => user._id !== userId
        // );
        // setUsersData(updatedUsersData);
        setUpdatedList(updatedList + 1)
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

    </>
  );
}

