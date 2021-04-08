import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useFetch } from "./custom-hooks/useFetch";

const favsUrl = "https://606216fdac47190017a7267c.mockapi.io/favourites";

const Map = ({ locations }) => {
  const [viewport, setViewport] = useState({
    latitude: 44.41248,
    longitude: 26.105038,
    zoom: 3,
  });

  let userId = null;
  if (localStorage.getItem("user")) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    userId = loggedUser.id;
  }

  const favSpot = useFetch(`${favsUrl}/${userId}`);
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

  const removeFav = () => {
    //delete req /w id
  };

  const saveFav = () => {
    //post request de add
  };

  return (
    <div className="container dashboard-item">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        className="map"
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
                {favSpot && favSpot.spot === id ? (
                  <img src="/goldSurferLogo.png" alt="Favourite Spot Icon" />
                ) : (
                  <img src="/surferLogo.png" alt="Surfer Icon" />
                )}
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
              {favSpot && favSpot.spot === selectedLocation.id ? (
                <button className="rm-fav" onClick={removeFav}>
                  Remove favourite
                </button>
              ) : (
                <button className="add-fav" onClick={saveFav}>
                  Save as favourite
                </button>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
