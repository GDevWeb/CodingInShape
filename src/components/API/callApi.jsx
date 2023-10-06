export const callApi = async (args) => {
    const requestOptions = {
      method: args.method,
      headers: {
        ...args.headers,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(args.data),
    };
  
    const response = await fetch(args.url, requestOptions);
  
    if (!response.ok) {
      throw new Error(`Échec de la requête avec le status: ${response.status}`);
    }
  
    const data = await response.json();
    return { data, status: response.status };
  };
  
  /*#📖 Création de ce dernier pour alléger le code et éviter la répétition inutile 📖:
  📝le 04/10/2023 utilisé dans UserManagement pour les différents fetch GET, PUT, DELETE 📝
  OPtimisation future : appliqué ce dernier pour tous les autres fetch
  */

  //Voir si je n'ai pas commis un doublon >< je suis paumé et fatigué >< 
  //Voir dans apiUsersSlice ><