// App.js
// Designed for only 2 possible id values in the received data
// So more simple data structure is used, like variable1 and variable2, but not array with id-indexed data records 

import { useState } from 'react';
import Websocket from 'react-websocket';
import '../styles/App.css';
import DataBox from './DataBox';
import Plot from './Plot';

function App() {

  // expected id values
  const [id1, id2] = [1, 2];
  // last received values of temperature 
  const [currentTemperature, setCurrentTemperature] = useState({
    temp1: 0,
    temp2: 0
  });
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
    receivedArray.forEach( (receivedElement) => {
      // records with data > 100 are not included in plots and temperature state 
      if (receivedElement.data > 100) return;
      // unscaled (x, y) coordinates of a plot point 
      let plotData = {
            time: receivedElement.timestamp,
            value: receivedElement.data
      };
      // select plot and temperature setState function corresponding to id value
      // switch statement is used for a code diversity, while only 2 id values are used
      switch (receivedElement.id) {
        case id1:
          setCurrentTemperature({
            ...currentTemperature,
            temp1: receivedElement.temperature
          });
          setDataPlot1([
            ...dataPlot1,
            plotData
          ]);
          break;
        case id2:
          setCurrentTemperature({
            ...currentTemperature,
            temp2: receivedElement.temperature
          });
          setDataPlot2([
            ...dataPlot2,
            plotData
          ]);
          break;
        default:
          console.log('Wrong data id is obtained');
      };
    });      
  }

  return (
    <div className="App">
      <Websocket 
        url='ws://localhost:8999'
        onMessage={handleData}
      />
      <header>
        <h1>Wiliot</h1>
        <p>Test</p>
      </header>
      <div className="data-box-container">
        <DataBox id={id1} temp={currentTemperature.temp1} />
        <DataBox id={id2} temp={currentTemperature.temp2} />
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
