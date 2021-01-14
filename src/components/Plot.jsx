// Plot.jsx

import { useEffect } from 'react';
import PlotMarker from './PlotMarker';

function Plot({data}) {

  const color1 = 'steelblue';
  const color2 = 'sienna';

  useEffect(() => {
    const canvas = document.getElementById('plot');
    if (canvas && data && data.length > 0) {
      // set scale !!! test formulas
      const dataHeight = 100; // maximum data value to be present
      const dataWidth = data[data.length - 1].timestamp - data[0].timestamp; // time period from beginning 
      if (canvas.getContext && dataWidth > 0) {  
        // scale coefficients
        const widthCoef = canvas.width / dataWidth;
        const heightCoef = canvas.height / dataHeight;
        console.log(widthCoef + ' ' + heightCoef);
        // draw plot !!! test line formulas
        const ctx = canvas.getContext('2d'); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color1;
        ctx.beginPath();
        // ctx.moveTo(0, canvas.height);
        ctx.moveTo(widthCoef * (data[0].timestamp - data[0].timestamp), canvas.height - heightCoef * data[0].data);
        ctx.lineTo(widthCoef * (data[1].timestamp - data[0].timestamp), canvas.height - heightCoef * data[1].data);
        ctx.stroke();
      }
    }
  });

  return (
    <div className="Plot">
      <h2>DATA</h2>
      <div className="plot-markers">
        <PlotMarker id={1} color={color1} />
        <PlotMarker id={2} color={color2} />
      </div>
      <canvas id="plot">
        Your browser doesn't support canvas
      </canvas>
    </div>
  );
}

export default Plot;