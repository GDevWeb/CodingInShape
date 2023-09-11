
export default function LogoutButton() {
  async function logoutUser() {
    localStorage.removeItem("token");

    window.location.href = "/login";
  }

  return <button onClick={logoutUser}>Déconnexion</button>;
}
