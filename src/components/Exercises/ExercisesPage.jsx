import {useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_PROFIL } from "../API/apiUser";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks";
import Card from "../Card/Card";

export default function ExercisesPage() {
  // Redux :
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  
  // Navigation :
  const navigate = useNavigate();


  // Récupération des données de l'utilisateur :
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${USER_PROFIL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Impossible de récupérer les données de l'utilisateur.");
          navigate("/login");

        } else {
          console.error("Impossible de récupérer les données de l'utilisateur.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, navigate]);

  return (
    <>
      {userData && (
        <>
          <Card
            title={"Liste des exercices"}
            content={"Retrouvez la liste des exercices"}
            link={`/exercises-list/`}
            textLink={"Voir la liste des exercices"}
          />

          <Card
            title={"Routine aléatoire"}
            content={`🚀 Vous ne savez pas par où commencer ? Laissez-vous guider par notre app !
            💪 Elle vous proposera 1 exercice par zone musculaire : 🧘‍♂️ cou, 💪 épaules, 🏋️‍♂️ dos, 🕺 hanches et 🏃‍♂️ jambes.
            ⏱️ Chaque exercice dure 20 secondes, soit moins de 2 minutes pour votre bien-être. C'est rapide, efficace et vous permettra de vous sentir revitalisé en un rien de temps !
            Rejoignez-nous sur Coding in Shape et découvrez comment prendre soin de votre corps, de votre esprit et de votre code. En quelques minutes par jour, vous pouvez renforcer votre corps tout en restant au top de votre jeu de développeur. 💻✨
            `}
            link={"/get-random-routine"}
            textLink={"Démarrer la routine"}
          />
        </>
      )}

      <ConditionalNavLinks isAdmin={isAdmin} />
    </>
  );
}
