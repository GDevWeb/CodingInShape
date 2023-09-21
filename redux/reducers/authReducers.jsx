const initialState = {
    isAuthenticated: false,
    token: null,
    errorMessage: '',
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: false,
          token: action.payload,
          errorMessage: '',
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
      return {
        ...state,
        isAdmin : action.payload,
      };

      default:
        return state;
    }
  };
  
  export default authReducer;
  