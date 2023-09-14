import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsersData } from "./fetchUserData";
import UserManagement from "./UserManagement";
import AddUser from "./AddUser";
import ExerciseManagement from "./ExerciseManagement";
import Spinner from "../../assets/icons/spinner.svg";
import usePagination from "../Hooks/usePagination";

export default function DashboardPage() {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showListOfUsers, setShowListOfUsers] = useState(true);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showListOfExercises, setShowListOfExercises] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsersData();
        setUsersData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // pagination :
  const { currentPage, displayedData, pageNumbers, setPage, lastPage } = usePagination(
    usersData || [],
    4
  );

  return (
    <>
      <h2>Dashboard</h2>
      {isLoading && <img src={Spinner} alt="loading" />}
      {showListOfUsers && usersData && (
        <UserManagement toggleUpdate={toggleUpdate} displayedUsers={displayedData} />
      )}
      {usersData && (
        <div className="pagination-buttons">
          {Array.from({ length: pageNumbers }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <p>page {currentPage} sur {lastPage}</p>
        </div>
      )}

      <h2>Ajouter un utilisateur :</h2>
      <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? "Cacher formulaire Ajout utilisateur" : "Ajouter un utilisateur"}
      </button>
      {showAddUserForm && <AddUser />}

      <h3>Gestion des exercices :</h3>
      <button onClick={() => setShowListOfExercises(!showListOfExercises)}>
        {showListOfExercises
          ? "Cacher la liste des exercices"
          : "Afficher la liste des exercices"}
      </button>
      {showListOfExercises && <ExerciseManagement />}
    </>
  );
}
