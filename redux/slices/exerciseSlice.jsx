import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    data: null,
    isLoading: true,
  },
  reducers: {
    setExerciseData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setExerciseData } = exerciseSlice.actions;
export default exerciseSlice.reducer;
