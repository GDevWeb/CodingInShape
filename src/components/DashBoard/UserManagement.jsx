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
import { useSelector, useDispatch } from "react-redux";
import {
  apiStart,
  apiSuccess,
  apiFailure,
} from "../../../redux/slices/apiUsersSlice";
import { callApi } from "../API/callApi";

export default function UserManagement() {
  const [usersData, setUsersData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const { filteredUsers } = useUserFilter(usersData, filterText);
  const { currentPage, displayedData, lastPage, setPage } = usePagination(
    filteredUsers,
    8
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (!isAuthenticated && !isAdmin) {
          navigate("/login");
          return;
        }

        dispatch(apiStart());

        const { data, status } = await callApi({
          method: "GET",
          url: USERS_API,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (status === 200) {
          setUsersData(data);
          setIsLoading(false);
          setSuccessMessage("Données des utilisateurs récupérées avec succès");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          console.error(
            "Impossible de récupérer les données des utilisateurs. Statut HTTP :",
            status
          );
          setIsLoading(false);
        }

        dispatch(apiSuccess());
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des utilisateurs :",
          error
        );
        setIsLoading(false);
        setServerErrors(
          "Erreur lors de la récupération des données des utilisateurs"
        );
        dispatch(apiFailure(error));
      }
    };

    fetchUsersData();
  }, [isAuthenticated, token, isAdmin, navigate, dispatch]);

  // Méthode pour mettre à jour le statut
  const handleAdminChange = async (userId) => {
    try {
      if (!isAuthenticated && !isAdmin) {
        navigate("/login");
        return;
      }

      dispatch(apiStart());

      const { status } = await callApi({
        method: "PUT",
        url: ADMIN_USER_API(userId),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
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
          status
        );
        setServerErrors("Impossible de mettre à jour le statut administrateur");
        setTimeout(() => {
          setServerErrors("");
        }, 3000);
      }

      dispatch(apiSuccess());
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut administrateur :",
        error
      );
      setServerErrors("Impossible de mettre à jour le statut administrateur");
      setTimeout(() => {
        setServerErrors("");
      }, 3000);

      dispatch(apiFailure(error));
    }
  };

  // Méthode pour bannir un utilisateur
  const handleBanChange = async (userId) => {
    try {
      if (!isAuthenticated && !isAdmin) {
        navigate("/login");
        return;
      }

      dispatch(apiStart());

      const { status } = await callApi({
        method: "PUT",
        url: BAN_USER_API(userId),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
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
          status
        );
        setServerErrors("Impossible de bannir l'utilisateur");
      }

      dispatch(apiSuccess());
    } catch (error) {
      console.error("Erreur lors du bannissement de l'utilisateur :", error);
      setServerErrors("Erreur lors du bannissement de l'utilisateur");

      dispatch(apiFailure(error));
    }
  };

  // Méthode pour réhabiliter un utilisateur :
  const handleUnbanChange = async (userId) => {
    try {
      if (!isAuthenticated && !isAdmin) {
        navigate("/login");
        return;
      }

      dispatch(apiStart());

      const { status } = await callApi({
        method: "PUT",
        url: UNBAN_USER_API(userId),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
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
          status
        );
        setServerErrors("Impossible de débannir l'utilisateur");
      }

      dispatch(apiSuccess());
    } catch (error) {
      console.error("Erreur lors du débannissement de l'utilisateur :", error);
      setServerErrors("Impossible de débannir l'utilisateur");

      dispatch(apiFailure(error));
    }
  };

  // Méthode pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      if (!isAuthenticated && !isAdmin) {
        navigate("/login");
        return;
      }

      dispatch(apiStart());

      const { status } = await callApi({
        method: "DELETE",
        url: `${USERS_API}/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 200) {
        console.log("Utilisateur supprimé avec succès");
        const updatedUsersData = usersData.filter(
          (user) => user._id !== userId
        );
        setSuccessMessage("Utilisateur supprimé avec succès");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setUsersData(updatedUsersData);
      } else {
        console.error(
          "Impossible de supprimer l'utilisateur. Statut HTTP :",
          status
        );
        setServerErrors("Impossible de supprimer l'utilisateur");
      }

      dispatch(apiSuccess());
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setServerErrors("Impossible de supprimer l'utilisateur");

      dispatch(apiFailure(error));
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
        }}
        name="filtre"
        id="filtre"
      />{" "}
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
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          page {currentPage} sur {lastPage}
        </span>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
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

/*📖 Composant admin - User 
Gestion de l'état de user via le dashboard :
passer administrateur
banni - débanni
supprimer le compte
📖*/
