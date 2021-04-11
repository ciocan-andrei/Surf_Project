import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useGlobalContext } from "./context";
import { useFetch } from "./custom-hooks/useFetch";
import { BsFilter } from "react-icons/bs";

const favsUrl = "https://606216fdac47190017a7267c.mockapi.io/favourites";

const Map = ({ locations, filterLocations }) => {
  const {
    isMapFilterOpen,
    toggleMapFilter,
    showResetFilterBtn,
    openResetFilterBtn,
    closeResetFilterBtn,
  } = useGlobalContext();

  const countryFilterRef = useRef(null);
  const probFilterRef = useRef(null);

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

  let favSpot = useFetch(`${favsUrl}/${userId}`);
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

  const applyFilter = (e) => {
    e.preventDefault();
    toggleMapFilter();
    filterLocations(
      countryFilterRef.current.value.trim(),
      probFilterRef.current.value.trim()
    );
    if (countryFilterRef.current.value || probFilterRef.current.value) {
      openResetFilterBtn();
    }
    if (
      countryFilterRef.current.value.trim() === "" &&
      probFilterRef.current.value.trim() === ""
    ) {
      closeResetFilterBtn();
      countryFilterRef.current.value = "";
      probFilterRef.current.value = "";
    }
  };
  const resetFilter = (e) => {
    e.preventDefault();
    toggleMapFilter();
    filterLocations("", "");
    countryFilterRef.current.value = "";
    probFilterRef.current.value = "";
    closeResetFilterBtn();
  };

  const removeFav = async () => {
    try {
      const res = await fetch(`${favsUrl}/${userId}`, { method: "DELETE" });
      const data = await res.json();
      setSelectedLocation(null);
      window.location.reload();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const saveFav = async (spotId) => {
    try {
      const res = await fetch(favsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
        },
        body: JSON.stringify({
          id: userId,
          createdAt: new Date().toLocaleString(),
          spot: spotId,
        }),
      });
      const data = await res.json();
      setSelectedLocation(null);
      window.location.reload();
      return data;
    } catch (e) {
      console.log(e);
    }
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
        doubleClickZoom={false}
        dragRotate={false}
        onDblClick={(e) => {
          console.log(e.lngLat);
        }}
        onClick={() => setSelectedLocation(null)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        className="map"
      >
        <button className="filter-btn" onClick={toggleMapFilter}>
          FILTERS <BsFilter />
        </button>
        <div
          className={`filter-box-container ${
            isMapFilterOpen && "make-visible"
          }`}
        >
          <form className="filter-box" action="">
            <input
              className="filter-input"
              type="text"
              placeholder="Country"
              ref={countryFilterRef}
            />
            <input
              className="filter-input"
              type="text"
              placeholder="Wind prob."
              ref={probFilterRef}
            />
            <button className="filter-input-btn" onClick={applyFilter}>
              APPLY FILTER
            </button>
            <button
              className={`filter-reset-btn ${
                showResetFilterBtn && "filter-reset-btn-show"
              }`}
              onClick={
                // () => resetLocations
                resetFilter
              }
            >
              RESET FILTER
            </button>
          </form>
        </div>
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
            closeOnClick={false}
          >
            <div className="map-popup">
              <h2>{selectedLocation.name}</h2>
              <p>{selectedLocation.country}</p>
              <p>Wind probability {selectedLocation.probability}</p>
              {favSpot && favSpot.spot === selectedLocation.id ? (
                <button
                  className="rm-fav"
                  onClick={() => {
                    removeFav();
                    setViewport(viewport);
                  }}
                >
                  Remove favourite
                </button>
              ) : (
                <button
                  className="add-fav"
                  onClick={() => {
                    saveFav(selectedLocation.id);
                    // setViewport(viewport);
                  }}
                >
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
