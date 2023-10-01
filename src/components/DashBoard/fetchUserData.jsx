export const fetchUsersDatakk = async () => { //non utilisé
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Token is missing");
      }
  
      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }
  };
  