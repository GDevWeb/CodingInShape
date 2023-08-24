import React, { useState, useEffect } from 'react';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [clientError, setClientError] = useState('');
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5200/post');
        if (response) {
          const data = await response.json();
          setRoutineData(data);
          console.log(routineData);
          setConnectionStatus('Connexion à la BDD établie');
        } else {
          setConnectionStatus('Échec de la connexion à la BDD (côté serveur)');
        }
      } catch (error) {
        setConnectionStatus('Erreur lors de la connexion à la BDD (côté client)');
        setClientError(error.message);
      }
    };
    fetchData()
    console.log(routineData[0].routine.exerciceFive);
  }, []);

  // const test = routineData.map((exercice, index) => {
  //   return (
  //     <div key={index}>
  //       <h2>{index}</h2>
  //       <p>Name: {routineData[index].exerciceOne.name}</p>
  //       <p>Description: {routineData[index].description}</p>
  //       <p>Target: {routineData[index].target}</p>
  //       <p>Benefits: {routineData[index].benefits}</p>
  //       <p>Medias: {routineData[index].medias}</p>
  //     </div>
  //   )
  // })
  return (
    <div className="App">
      {/* <p>{connectionStatus}</p> */}
      {/* {clientError && <p>Erreur côté client : {clientError}</p>} */}
      {/* {test} */}
      <div>
      {/* <div key={index}>
        <h2>{index}</h2>
        <p>Name: {routineData[0].routine.exerciceFive}</p>
        <p>Description: {routineData[index].exerciceOne.description}</p>
        <p>Target: {routineData[index].exerciceOne.target}</p>
        <p>Benefits: {routineData[index].exerciceOne.benefits}</p>
        <p>Medias: {routineData[index].exerciceOne.medias}</p>
      </div> */}
      </div>

    </div>
  );
}

export default App;
