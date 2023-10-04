import { Link } from "react-router-dom";
import Card from "../Card/Card";

export default function ExerciseManagement() {
  return (
    <>
      <h1>Exercise Management</h1>

      <Card
        title={"Liste des exercices"}
        content={"Accéder à la liste des exercices"}
        link={"/exercises-list"}
      />

      <Card
        title={"Ajouter un exercice"}
        content={"Accéder au formulaire d'ajout d'exercice"}
        link={"/add-exercise"}
      />

      <Link to={"/dashboard"}>Retour au dashboard</Link>
    </>
  );
}

/*📖 Page - Composant accueillant des links vers le CRUD (READ - Create) des exercises 📖*/