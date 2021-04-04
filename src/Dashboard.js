import { useState, useEffect } from "react";
import InfoTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";

const Dashboard = () => {
  const locations = useFetch(spotsUrl);

  return (
    <div>
      <Map locations={locations} />
      <InfoTable locations={locations} />
    </div>
  );
};

export default Dashboard;
