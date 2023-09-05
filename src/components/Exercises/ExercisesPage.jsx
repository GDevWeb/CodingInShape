import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserExercises from "./UserExercises";

export default function ExercisesPage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        // Récupérer le token depuis les cookies
        // const token = Cookies.get("token");
        const token = localStorage.getItem("token");
        console.log("Token obtenu :", token);

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/auth/MyProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
          setIsLoading(false);
        } else {
          console.error(
            "Impossible de récupérer les données de l'utilisateur."
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <h2>Exercise</h2>
      <UserExercises />
    </>
  );
}
