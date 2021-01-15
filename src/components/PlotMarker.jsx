// PlotMarker.jsx
// Displays ID and plot marker

import React from 'react';

function PlotMarker({id, color}) {

  // <span style={{backgroundColor: color}}></span>{id}

  return (
    <div className="PlotMarker" style={{borderColor: color}}>
      {id}
    </div>
  );
}

export default PlotMarker;