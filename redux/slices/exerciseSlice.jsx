import { createSlice } from "@reduxjs/toolkit";
import { EXERCISES_API } from "../../src/components/API/apiAdminExercises";

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    data: null,
    isLoading: true,
    successMessage: "",
    serverErrors: "",
  },
  reducers: {
    setExerciseData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setServerErrors: (state, action) => {
      state.serverErrors = action.payload;
    },
  },
});

// Action asynchrone pour mettre à jour l'exercice
export const updateExercise = (exerciseId, exerciseData) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token; // le token depuis l'état authentification
    const response = await fetch(`${EXERCISES_API}/${exerciseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(exerciseData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setExerciseData(data)); // update les données de l'exercice dans le store
      dispatch(setSuccessMessage("Exercice modifié avec succès"));
    } else {
      console.error("Échec de la mise à jour de l'exercice :", response.statusText);
      dispatch(setServerErrors("Échec de la mise à jour de l'exercice"));
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'exercice :", error);
    dispatch(setServerErrors("Erreur lors de la mise à jour de l'exercice"));
  }
};

export const { setExerciseData, setSuccessMessage, setServerErrors } = exerciseSlice.actions;
export default exerciseSlice.reducer;

/*📖 Composant admin et user - Exercises
//en test 
📖*/