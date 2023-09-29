import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "users",
    initialState: {
        data: [],
        filterText: "",
        isLoading : true,
        successMessage : "",
        serverErrors: "",

    },

    reducers : {
        setUsersData : (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },
        setFilterText : (state, action) => {
            state.filterText = action.payload;
        },
        successMessage : (state, action) => {
            state.successMessage = action.payload;
        },
        serverErrors : (state, action) => {
            state.serverErrors = action.payload;
        },
    }
});

export const {
    setUsersData,
    setFilterText,
    setSuccessMessage,
    setServerErrors,
} = userSlice;

export default userSlice.reducer;