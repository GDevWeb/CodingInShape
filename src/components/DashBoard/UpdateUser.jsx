import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateUser({ userId, onUpdateUser }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Include the email field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const navigate = useNavigate(); // Invoke useNavigate as a function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to the login page if the token is not present
        navigate("/login");
        return;
      }

      // Send a PUT request to update the user data
      const response = await fetch(`YOUR_UPDATE_USER_API/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // If the response is successful, update the local user data
        // and display a success message
        onUpdateUser(userId, userData);
        setSuccessMessage("User updated successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        // Handle HTTP errors
        console.error("Unable to update user. HTTP Status:", response.status);
        setServerErrors("Unable to update user");
      }
    } catch (error) {
      // Handle request errors
      console.error("Error updating user:", error);
      setServerErrors("Error updating user");
    }
  };

  return (
    <>
      <h3>Modification des données utilisateur</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>

      <div className="success-message">
        {successMessage && <p>{successMessage}</p>}
      </div>
      <div className="server-error">
        {serverErrors && <p>{serverErrors}</p>}
      </div>
    </>
  );
}
