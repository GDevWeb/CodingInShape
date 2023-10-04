import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const callApi = createAsyncThunk(
  "api/callApi",
  async ({ method, url, token, data }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const responseData = await response.json();
        return rejectWithValue(responseData.message);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue("Erreur lors de l'appel à l'API");
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    apiStart(state) {
      state.loading = true;
      state.error = null;
    },
    apiSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    apiFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },  extraReducers: (builder) => {
    builder
      .addCase(callApi.pending, (state) => { //en attente
        state.loading = true;
        state.error = null;
      })
      .addCase(callApi.fulfilled, (state, action) => { //effectué
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(callApi.rejected, (state, action) => { //rejeté
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {apiStart, apiSuccess, apiFailure} = apiSlice.actions;
export default apiSlice.reducer;
