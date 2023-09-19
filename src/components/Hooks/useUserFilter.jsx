import { useState, useMemo } from "react";

export default function useUserFilter(userData, filterText) {
  const [filteredUsers, setFilteredUsers] = useState(userData);

  useMemo(() => {
    const filtered = userData.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.pseudo.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [userData, filterText]);

  return {
    filteredUsers,
  };
}
