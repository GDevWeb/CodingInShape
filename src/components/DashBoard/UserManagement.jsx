import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import StatsTab from "./StatsTab";
import useUserFilter from "../Hooks/useUserFilter";
import usePagination from "../Hooks/usePagination";
import UserRow from "./UserRow";
import "../../../src/main.scss";

// Import des composants locaux :
import Spinner from "../../assets/icons/spinner.svg";

// Import des constantes et variables d'API :
import {
  USERS_API,
  BAN_USER_API,
  UNBAN_USER_API,
  ADMIN_USER_API,
} from "../API/apiAdmin";


export default function UserManagement() {
  // État local pour stocker les données des utilisateurs, l'utilisateur à supprimer,
  // la visibilité de la confirmation, le chargement, les messages de succès
  // et les erreurs du serveur.
    const [usersData, setUsersData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [userToDelete, setUserToDelete] = useState(null);
    const [confirmationVisible, setConfirmationVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

  // Filtres :
  const { filteredUsers } = useUserFilter(usersData, filterText);  // pagination :
// pagination :
const {
  currentPage,
  displayedData,
  pageNumbers,
  lastPage,
  setPage,
  itemsPerpage,
} = usePagination(filteredUsers, 8);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  // Hook pour obtenir la fonction de navigation de React Router
  const navigate = useNavigate();

  // Hook useEffect pour récupérer les données des utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        // Obtenir le jeton d'authentification depuis le stockage local
        const token = localStorage.getItem("token");

        if (!token) {
          // Rediriger vers la page de connexion si le jeton n'est pas présent
          navigate("/login");
          return;
        }

        // Effectuer une requête GET pour récupérer les données des utilisateurs
        const response = await fetch(USERS_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          // Si la réponse est réussie, mettre à jour l'état local avec les données
          const data = await response.json();
          setUsersData(data);
          setIsLoading(false);
          setSuccessMessage("Données des utilisateurs récupérées avec succès");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          // Gérer les erreurs de la réponse HTTP
          console.error(
            "Impossible de récupérer les données des utilisateurs. Statut HTTP :",
            response.status
          );
          setIsLoading(false);
        }
      } catch (error) {
        // Gérer les erreurs de requête
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
    // Appeler la fonction pour récupérer les données des utilisateurs
    fetchUsersData();
  }, [navigate]);

  // Méthode pour mettre à jour le statut administrateur
  const handleAdminChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Rediriger vers la page de connexion si le jeton n'est pas présent
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
        // Si la réponse est réussie, mettre à jour l'état local et afficher un message de succès
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
        // Gérer les erreurs de la réponse HTTP
        console.error(
          "Impossible de mettre à jour le statut administrateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de mettre à jour le statut administrateur");
      }
    } catch (error) {
      // Gérer les erreurs de requête
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
        // Rediriger vers la page de connexion si le jeton n'est pas présent
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
        // Si la réponse est réussie, mettre à jour l'état local et afficher un message de succès
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
        // Gérer les erreurs de la réponse HTTP
        console.error(
          "Impossible de bannir l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de bannir l'utilisateur");
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors du bannissement de l'utilisateur :", error);
      setServerErrors("Erreur lors du bannissement de l'utilisateur");
    }
  };

  // Méthode pour réhabiliter un utilisateur :
  const handleUnbanChange = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Rediriger vers la page de connexion si le jeton n'est pas présent
        navigate("/login");
        return;
      }

      // Méthode pour réhabiliter un utilisateur :
      const response = await fetch(UNBAN_USER_API(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        // Si la réponse est réussie, mettre à jour l'état local et afficher un message de succès
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
        // Gérer les erreurs de la réponse HTTP
        console.error(
          "Impossible de débannir l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de débannir l'utilisateur");
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors du débannissement de l'utilisateur :", error);
      setServerErrors("Impossible de débannir l'utilisateur");
    }
  };

  // Méthode pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Rediriger vers la page de connexion si le jeton n'est pas présent
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
        // Si la réponse est réussie, mettre à jour l'état local et afficher un message de succès
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
        // Gérer les erreurs de la réponse HTTP
        console.error(
          "Impossible de supprimer l'utilisateur. Statut HTTP :",
          response.status
        );
        setServerErrors("Impossible de supprimer l'utilisateur");
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setServerErrors("Impossible de supprimer l'utilisateur");
    }
  };

  return (
    <>
      {isLoading && <img src={Spinner} alt="Chargement en cours" />}
      {/* Affichage du titre et des statistiques */}
      <h2>Liste des utilisateurs</h2>
      <StatsTab usersData={usersData} adminCount={usersData.adminCount} />
      <label htmlFor="filtre">Rechercher par nom, prénom ...</label>
      <input
        type="text"
        placeholder="Filtre"
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
        } }
        name="filtre"
        id="filtre"
      />      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Administrateur</th>
            <th>Banni</th>
            <th>Actions</th>
            <th>Supprimer</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping des utilisateurs pour afficher chaque ligne utilisateur */}
          {displayedData &&
            displayedData.map((user) => (
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

      {/* Buttons de pagination : */}
      <div>
        <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>page {currentPage} sur {lastPage}</span>
        <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === lastPage}>
          Next
        </button>
      </div>
      {/* Affichage des messages de succès et d'erreurs */}
      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="server-error">
        {serverErrors && <p>{serverErrors}</p>}
      </div>

      <Link to={"/dashboard"}>Retour au dashboard</Link>
    </>
  );
}