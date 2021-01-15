// Plot.jsx
// Displays a canvas and builds plot

import React, { useEffect } from 'react';
import PlotMarker from './PlotMarker';

function Plot({idData, plotData}) {

  // colors of data marker and plot line corresponding to idData
  const color = ['steelblue', 'sienna'];

  useEffect(() => {

    // get interval of data values
    if (plotData.plot1.length > 0 && plotData.plot2.length > 0 && idData.length === 2 ) {
      const dataHeight = 100; // maximum data value to be present
      const dataTimeMin = 
        Math.min(
          plotData.plot1[0].time, 
          plotData.plot2[0].time
        );
      const dataTimeMax = 
        Math.max(
          plotData.plot1[plotData.plot1.length - 1].time, 
          plotData.plot2[plotData.plot2.length - 1].time
        );
      const dataWidth = dataTimeMax - dataTimeMin;
      
      // canvas operations
      const canvas = document.getElementById('plot');
      if (canvas.getContext && dataWidth > 0) {  
        // get scale coefficients
        const widthCoef = canvas.width / dataWidth;
        const heightCoef = canvas.height / dataHeight;
        // prepare plot canvas
        const ctx = canvas.getContext('2d'); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;
        // plot building function
        const buildPlot = (data, color) => {
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.moveTo(
            widthCoef * (data[0].time - dataTimeMin ), 
            canvas.height - heightCoef * data[0].value
          );
          for (let point of data) {
            ctx.lineTo(
              widthCoef * (point.time - dataTimeMin), 
              canvas.height - heightCoef * point.value
            );
          } 
          ctx.stroke();
        }
        // build plots
        buildPlot(plotData.plot1, color[0]);
        buildPlot(plotData.plot2, color[1]);
      }
    }
  });

  return (
    <div className="Plot">
      <h2>Data</h2>
      <div className="plot-markers">
        {
          idData.map( 
            (id, index) => 
            <PlotMarker id={id} color={color[index]} key={index}  />
          )        
        }
      </div>
      <canvas id="plot">
        Your browser doesn't support canvas
      </canvas>
    </div>
  );
}

export default Plot;