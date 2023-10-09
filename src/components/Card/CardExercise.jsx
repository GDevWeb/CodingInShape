import { Link } from 'react-router-dom';

export default function CardExercise ({ exercise, isAdmin }){
  return (
    <li className="exercise-item">
      <h2 className="exercise-name">{exercise.name}</h2>
      <p className="exercise-description">
        {exercise.description.length > 50 ? (
          `${exercise.description.substring(0, 20)}...`
        ) : (
          exercise.description
        )}
      </p>
      <p className="exercise-type">Type: {exercise.type}</p>
      <p className="exercise-muscle">Muscle ciblé: {exercise.muscle}</p>
      <img
        src={exercise.image}
        alt={`Image de ${exercise.name}`}
        className="exercise-image"
      />
      <Link to={`/exercise-detail/${exercise._id}`} className="exercise-link">
        Voir détail de l'exercice
      </Link>
      {isAdmin && (
        <>
          <Link
            to={`/update-exercise/${exercise._id}`}
            className="exercise-link put"
          >
            Modifier l'exercice
          </Link>
          <Link
            to={`/delete-exercise/${exercise._id}`}
            className="exercise-link delete"
          >
            Supprimer l'exercice
          </Link>
        </>
      )}
    </li>
  );
};
