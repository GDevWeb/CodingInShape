import React from 'react'

export default function LogoutButton() {

  const handleLogout = () => { 

    localStorage.removeItem("token");
    }
  return (
    <>
    
    <button onClick={handleLogout}>Déconnexion</button>  

    </>
  )
}
