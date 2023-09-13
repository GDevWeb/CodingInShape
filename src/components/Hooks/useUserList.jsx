import { useState } from 'react';

export function useUserList(initialData = []) {
  const [usersData, setUsersData] = useState(initialData);

  const updateUserList = (userId, updatedUser) => {
    setUsersData((prevUsersData) =>
      prevUsersData.map((user) =>
        user._id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsersData((prevUsersData) =>
      prevUsersData.filter((user) => user._id !== userId)
    );
  };

  return { usersData, updateUserList, deleteUser };
}
