import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import './ExerciseManagementPage.scss'

export default function ExerciseManagement() {


  return (
    <div className='ExerciseManagementPageContainer'>
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

    </div>
  );
}
