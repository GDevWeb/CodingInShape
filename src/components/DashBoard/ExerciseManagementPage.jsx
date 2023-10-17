import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import icons from "../../assets/icons/index_icons";
import ConditionalNavLinks from "../ConditionalNavLinks/ConditionalNavLinks"
import './ExerciseManagementPage.scss'

export default function ExerciseManagement() {

  const isAdmin = useSelector((state) => state.auth.isAdmin);


  return (
    <div className='ExerciseManagementPageContainer'>
      <h1>Exercise Management</h1>

      <Card
      icon={icons.List}
        title={"Liste des exercices"}
        content={"Accéder à la liste des exercices"}
        link={"/exercises-list"}
      />

      <Card
      icon={icons.Plus}
        title={"Ajouter un exercice"}
        content={"Accéder au formulaire d'ajout d'exercice"}
        link={"/add-exercise"}
      />

      <ConditionalNavLinks
      isAdmin={isAdmin}
      />

    </div>
  );
}

/*📖 Page - Composant accueillant des links vers le CRUD (READ - Create) des exercises 📖*/