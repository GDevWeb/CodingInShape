import { useState } from "react";
import { USERS_API } from "./apiUser";

function useAvatarUpload() {
  const [avatarURL, setAvatarURL] = useState(null);

  const uploadAvatar = async (file, token) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`${USERS_API}/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarURL(data.avatar);
      } else {
        console.error("Erreur lors du téléchargement de l'avatar. HTTP Status:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'avatar:", error);
    }
  };

  return { avatarURL, uploadAvatar };
}

export default useAvatarUpload;
