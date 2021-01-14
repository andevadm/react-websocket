// PlotMarker.jsx
// Displays ID and plot marker

function PlotMarker({id, color}) {

  return (
    <div className="PlotMarker">
      <span style={{backgroundColor: color}}></span>{id}
    </div>
  );
}

export default PlotMarker;