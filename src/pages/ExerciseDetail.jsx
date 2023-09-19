import { useParams } from "react-router-dom";

const exerciseData = [
  { id: "1", name: "Exercice 1", description: "Description de l'exercice 1" },
  { id: "2", name: "Exercice 2", description: "Description de l'exercice 2" },
  // ...
];

export default function ExerciseDetail() {
  const { exerciseId } = useParams();

  const exercise = exerciseData.find((exercise) => exercise.id === exerciseId);

  if (!exercise) {
    return <div>Exercice non trouvé</div>;
  }

  return (
    <div>
      <h2>Exercise Details</h2>
      <h3>Nom : {exercise.name}</h3>
      <p>Description : {exercise.description}</p>
    </div>
  );
}

// en cours  src/components/Exercises/ExerciseList.jsx