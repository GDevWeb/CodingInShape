import { useState } from 'react'

export default function useUserFilter(userData) {
    const [filteredUsers, setFilteredUsers] = useState(userData);

    const filterUserData = (filterText) => {
        const filtered = userData.filter((user) => {
            return (
                user.firstName.toLowerCase().includes(filterText.toLowerCase()) || 
                user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
                user.pseudo.toLowerCase().includes(filterText.toLowerCase())||
                user.email.toLowerCase().includes(filterText.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    }

    return {
        filteredUsers,
        filterUserData,
    };
}
