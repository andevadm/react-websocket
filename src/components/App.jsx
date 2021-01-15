// App.js
// Designed for only 2 possible records in the received data
// So a simple data structure is used, like variable1 and variable2, but not an array with id-indexed data records 
// Different code patterns can be used for similar tasks in order to demonstrate coding diversity

import React, { useState } from 'react';
import Websocket from 'react-websocket';
import '../styles/App.css';
import DataBox from './DataBox';
import Plot from './Plot';

function App() {

  // received id values, here not previously defined
  const [id1, setId1] = useState();
  const [id2, setId2] = useState();
  // last received values of temperature 
  const [currentTemp1, setCurrentTemp1] = useState(0);
  const [currentTemp2, setCurrentTemp2] = useState(0);
  // arrays of plot points {time, value} obtained from {timestamp, data}
  const [dataPlot1, setDataPlot1] = useState([]);
  const [dataPlot2, setDataPlot2] = useState([]);

  // function to set state according to data received from ws server
  function handleData(dataWS) {
    const receivedArray = JSON.parse(dataWS); 
    // check for only 2 records in the received data  
    if (!receivedArray || receivedArray.length !== 2) {
      console.log('Wrong data format received');
      return
    } 
    // set expected id values if undefined
    if (!id1) setId1(receivedArray[0].id);
    if (!id2) setId2(receivedArray[1].id);
    // process data from the received array
    receivedArray.forEach( (receivedElement) => {
      // records with data > 100 are not included in plots and temperature state 
      if (receivedElement.data > 100) return;
      // unscaled (x, y) coordinates of a plot point 
      let plotData = {
            time: receivedElement.timestamp,
            value: receivedElement.data
      };
      // select plot and temperature setState function corresponding to id value      
      switch (receivedElement.id) {
        case id1:
          setCurrentTemp1(receivedElement.temperature);
          setDataPlot1([
            ...dataPlot1,
            plotData
          ]);
          break;
        case id2:
          setCurrentTemp2(receivedElement.temperature);
          setDataPlot2([
            ...dataPlot2,
            plotData
          ]);
          break;
        default:
          console.log('Received id is not previously set');
      };
    });      
  }

  return (
    <div className="App">
      <header>
        <h1>Wiliot</h1>
        <p>Test</p>
      </header>
      <Websocket 
        url='ws://localhost:8999'
        onMessage={handleData}
      />
      <div className="data-box-container">
        <DataBox id={id1} temp={currentTemp1} />
        <DataBox id={id2} temp={currentTemp2} />
      </div>
      <Plot 
        idData={[id1, id2]}
        plotData={{
          plot1: dataPlot1,
          plot2: dataPlot2,
        }} 
      />
    </div>
  );
}

export default App;
