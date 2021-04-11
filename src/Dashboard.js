import { useState, useEffect } from "react";
import InfoTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";

const Dashboard = () => {
  const locations = useFetch(spotsUrl);
  // const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showFilteredLocations, setShowFilteredLocations] = useState(false);

  // const getLocations = async () => {
  //   const res = await fetch(spotsUrl);
  //   const newLocations = await res.json();
  //   setShowFilteredLocations(false);
  //   setLocations(newLocations);
  // };

  // useEffect(() => {
  //   getLocations();
  // }, []);

  const filterLocations = (country, prob) => {
    console.log(country, prob);
    if (country === "" && prob === "") {
      setShowFilteredLocations(false);
    }
    // else {
    //   const newLocations = locations.filter(
    //     (location) =>
    //       country &&
    //       location.country.toLowerCase().indexOf(country.toLowerCase()) > -1 &&
    //       prob &&
    //       location.probability.toString().startsWith(prob)
    //   );
    //   setShowFilteredLocations(true);
    //   setFilteredLocations(newLocations);
    //   console.log(newLocations);
    // }
    else {
      let newLocations = locations;
      if (country) {
        newLocations = newLocations.filter(
          (location) =>
            location.country.toLowerCase().indexOf(country.toLowerCase()) > -1
        );
      }
      if (prob) {
        newLocations = newLocations.filter((location) =>
          location.probability.toString().startsWith(prob)
        );
      }
      setShowFilteredLocations(true);
      setFilteredLocations(newLocations);
      console.log(newLocations);
    }
  };

  return (
    <div className="bg-color">
      <main className="section">
        <Map
          locations={!showFilteredLocations ? locations : filteredLocations}
          filterLocations={filterLocations}
          // resetLocations={getLocations}
        />
        <InfoTable
          locations={!showFilteredLocations ? locations : filteredLocations}
        />
      </main>
    </div>
  );
};

export default Dashboard;
