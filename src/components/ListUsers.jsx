import React, { useState, useEffect } from 'react';
import spinner from '../assets/icons/spinner.svg';

export default function ListUsers() {
  const [userList, setUserList] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  useEffect(() => {
    setUserList({
      ...userList,
      loading: true,
    });

    fetch('http://localhost:4000/api/admin/users',
    {
      // method: 'GET',
      // headers: {
      //   Authorization : `Bearer ${localStorage.getItem('token')}`
      // }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList({
          loading: false,
          error: false,
          data: data,
        });
      })
      .catch(() => {
        setUserList({
          loading: false,
          error: true,
          data: undefined,
        });
      });
  }, []); 

  let content;

  if (userList.loading) {
    content = <img src={spinner} alt="spinner de chargement" />;
  } else if (userList.error) {
    content = <div>Erreur lors du chargement de la liste des Membres</div>; // Fixed error message
  } else if (!userList.data || userList.data.length === 0) {
    content = <div>Pas d'utilisateurs trouvés</div>; 
  } else {
    content = userList.data.map((user) => (
      <ul key={user.id}>
        
        <li>{user.firstName} {user.lastName} {user.isAdmin} {user.isBan}</li>
        
        </ul>
    ));
  }

  return <div className="user-list">{content}</div>; 
}
