// DataBox.js
// Displays ID and current temperature

import React from 'react';

function DataBox({id, temp}) {
  return (
    <div className="DataBox">
      <h2>ID {id}</h2>
      <p>Temp: {temp} C</p>
    </div>
  );
}

export default DataBox;