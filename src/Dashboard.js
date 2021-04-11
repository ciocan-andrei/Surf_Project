import { useState, useEffect } from "react";
import InfoTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";

const Dashboard = () => {
  const locations = useFetch(spotsUrl);

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showFilteredLocations, setShowFilteredLocations] = useState(false);

  function filterLocations(country, prob) {
    if (country === "" && prob === "") {
      setShowFilteredLocations(false);
    } else {
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
  }

  return (
    <div className="bg-color">
      <main className="section">
        <Map
          locations={!showFilteredLocations ? locations : filteredLocations}
          filterLocations={filterLocations}
        />
        <InfoTable
          locations={!showFilteredLocations ? locations : filteredLocations}
        />
      </main>
    </div>
  );
};

export default Dashboard;
