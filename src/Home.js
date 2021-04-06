import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [sideMenuToggle, setSideMenuToggle] = useState(false);
  const handleToggle = () => {
    setSideMenuToggle(!sideMenuToggle);
  };

  return (
    <>
      <section className={`front-page ${sideMenuToggle ? "active" : ""}`}>
        <header>
          <h2 className="logo">Kite</h2>
          <div
            className={`toggle ${sideMenuToggle ? "active" : ""}`}
            onClick={handleToggle}
          ></div>
        </header>
        <video src="seasurfer.mp4" type="video/mp4" autoPlay loop muted></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>WELCOME</h2>
          <h3>to kitesurf</h3>
          <p>Lots of kites.</p>
          <Link to="/dashboard" className="dashboard-item">
            GET STARTED
          </Link>
        </div>
      </section>
      <div className="menu">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="#">Register</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
