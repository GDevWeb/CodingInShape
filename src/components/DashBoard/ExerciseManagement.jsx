import React, { useState } from 'react';
import ListOfExercises from '../Exercises/ListOfExercises';
import AddExercise from '../Exercises/AddExercises';

export default function ExerciseManagement() {
  const [listOfExercisesVisible, setListOfExercisesVisible] = useState(false);
  const [addExerciseVisible, setAddExerciseVisible] = useState(false);

  return (
    <>
      <h1>Exercise Management</h1>

      <button onClick={() => setListOfExercisesVisible(!listOfExercisesVisible)}>
        {listOfExercisesVisible ? "Cacher la liste des exercices" : "Afficher la liste des exercices"}
      </button>

      {listOfExercisesVisible && <ListOfExercises />}

      <button onClick={() => setAddExerciseVisible(!addExerciseVisible)}>
        {addExerciseVisible ? "Cacher le formulaire d'ajout d'exercice" : "Afficher le formulaire d'ajout d'exercice"}
      </button>

      {addExerciseVisible && <AddExercise />}
    </>
  );
}
