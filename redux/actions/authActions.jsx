export const loginSuccess = (token, isAdmin) => ({
    type : `LOGIN_SUCCESS`,
    payload : {
        token,
        isAdmin
    },
});

export const updateAdminStatus = (isAdmin) => (dispatch) => {
    // Log de la nouvelle valeur d'isAdmin
    console.log('New isAdmin value:', isAdmin);
  
    dispatch({
      type: 'UPDATE_ADMIN_STATUS',
      payload: isAdmin,
    });
  };
  