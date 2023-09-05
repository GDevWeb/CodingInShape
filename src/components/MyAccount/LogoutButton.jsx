import Cookies from 'js-cookie';

export default function LogoutButton() {
  async function logoutUser() {
    try {
      // Envoie une requête de déconnexion au serveur
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "GET", 
        credentials: "include", 
      });
  
      if (response.ok) {
        Cookies.remove("token", { path: "/" }); 
  
        window.location.href = "/login";
      } else {

        console.error("Échec de la déconnexion :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  return (
    <button onClick={logoutUser}>Déconnexion</button>
  );
}
