import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ locations }) => {
  const [viewport, setViewport] = useState({
    latitude: 44.41248,
    longitude: 26.105038,
    zoom: 3,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="container">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        {locations.map((location) => {
          const { id, lat, long } = location;
          return (
            <Marker
              key={id}
              latitude={parseFloat(lat)}
              longitude={parseFloat(long)}
            >
              <button
                className="map-marker"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedLocation(location);
                }}
              >
                <img src="/surferLogo.svg" alt="Surfer Icon" />
              </button>
            </Marker>
          );
        })}

        {selectedLocation && (
          <Popup
            latitude={parseFloat(selectedLocation.lat)}
            longitude={parseFloat(selectedLocation.long)}
            onClose={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
              <p>{selectedLocation.country}</p>
              <p>Wind probability {selectedLocation.probability}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
