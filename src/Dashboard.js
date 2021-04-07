import { useState, useEffect } from "react";
import InfoTable from "./InfoTable";
import Map from "./Map";
import { useFetch } from "./custom-hooks/useFetch";

const spotsUrl = "https://606216fdac47190017a7267c.mockapi.io/spot";
const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Dashboard = () => {
  const locations = useFetch(spotsUrl);

  return (
    <div className="bg-color">
      <main className="section">
        <Map locations={locations} />
        <InfoTable locations={locations} />
      </main>
    </div>
  );
};

export default Dashboard;
