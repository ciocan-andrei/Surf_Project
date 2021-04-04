import { useState, useEffect } from "react";
import StickyHeadTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";

const Dashboard = () => {
  // const [locations, setLocations] = useState([]);

  // const fetchData = async () => {
  //   const res = await fetch(spotsUrl);
  //   const data = await res.json();
  //   setLocations(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  const locations = useFetch(spotsUrl);

  return (
    <div>
      <Map locations={locations} />
      <StickyHeadTable locations={locations} />
    </div>
  );
};

export default Dashboard;
