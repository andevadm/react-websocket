// App.js

import { useState } from 'react';
import '../styles/App.css';
import DataBox from './DataBox';
import Plot from './Plot';

function App() {

  // test static state
  const [dataArray, setDataArray] = useState([
    {
      id: 1,
      timestamp: Date.now(),
      data: 30,
      temperature: 31
    },
    {
      id: 2,
      timestamp: Date.now() + 1000,
      data: 14,
      temperature: 14
    }  
  ]);

  return (
    <div className="App">
      <header>
        <h1>Wiliot</h1>
        <p>Test</p>
      </header>
      <div className="data-box-container">
        <DataBox id={1} temp={21} />
        <DataBox id={2} temp={12} />
      </div>
      <Plot data={dataArray} />
    </div>
  );
}

export default App;
