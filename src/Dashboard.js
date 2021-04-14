import { useState } from "react";
import InfoTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";
import Modal from "./ModalMsg";
import { useGlobalContext } from "./context";
import ModalNewSpot from "./ModalNewSpot";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";
const favsUrl = "https://606216fdac47190017a7267c.mockapi.io/favourites";

const Dashboard = () => {
  const locations = useFetch(spotsUrl);
  const {
    isModalOpen,
    closeModal,
    modalContent,
    modalType,
  } = useGlobalContext();

  let userId = null;
  if (localStorage.getItem("user")) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    userId = loggedUser.id;
  }
  const favSpot = useFetch(`${favsUrl}/${userId}`);

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
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalContent={modalContent}
          modalType={modalType}
        />
      )}
      <ModalNewSpot />
      <main className="section">
        <Map
          locations={!showFilteredLocations ? locations : filteredLocations}
          filterLocations={filterLocations}
          faveSpot={favSpot}
        />
        <InfoTable
          locations={!showFilteredLocations ? locations : filteredLocations}
        />
      </main>
    </div>
  );
};

export default Dashboard;
