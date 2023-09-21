export const login = () => (dispatch) => {

  dispatch({ type: "LOGIN" });
};

export const loginSuccess = (token, isAdmin) => ({
  type: `LOGIN_SUCCESS`,
  payload: {
    token,
    isAdmin,
  },
});

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");

  navigate("/");

  dispatch({ type: "LOGOUT" });
};
export const updateAdminStatus = (isAdmin) => (dispatch) => {
  console.log("New isAdmin value:", isAdmin);

  dispatch({
    type: "UPDATE_ADMIN_STATUS",
    payload: isAdmin,
  });
};
