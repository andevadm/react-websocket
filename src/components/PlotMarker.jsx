// PlotMarker.jsx

function PlotMarker({id, color}) {

  return (
    <div className="PlotMarker">
      <span style={{backgroundColor: color}}></span>{id}
    </div>
  );
}

export default PlotMarker;