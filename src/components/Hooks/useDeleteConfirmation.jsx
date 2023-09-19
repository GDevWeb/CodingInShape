import { useState } from "react";

export function useDeleteConfirmation() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const showConfirmation = (item) => {
    setItemToDelete(item);
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setItemToDelete(null);
    setConfirmationVisible(false);
  };

  return {
    confirmationVisible,
    itemToDelete,
    showConfirmation,
    hideConfirmation,
  };
}
