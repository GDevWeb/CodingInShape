const initialState = {
    isAuthenticated: false,
    token: null,
    errorMessage: '',
    isAdmin: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: false,
          token: action.payload,
          errorMessage: '',
          isAdmin: '',
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          errorMessage: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          errorMessage: '',
        };

      case `UPDATE_ADMIN_STATUS`: 
      console.log('New isAdmin value in reducer:', action.payload);
      return {
        ...state,
        isAdmin : action.payload,
      };

      default:
        return state;
    }
  };
  
  export default authReducer;
  