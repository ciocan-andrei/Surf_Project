import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";

const Home = () => {
  const [sideMenuToggle, setSideMenuToggle] = useState(false);
  const handleToggle = () => {
    setSideMenuToggle(!sideMenuToggle);
  };

  let user = null;
  if (localStorage.getItem("user")) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    user = loggedUser;
  }

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <section className={`front-page ${sideMenuToggle ? "active" : ""}`}>
        <header>
          <h2 className="logo">Kite</h2>
          <div className="toggle" onClick={handleToggle}>
            {!sideMenuToggle && <IoMenu className="home-btn" />}
          </div>
        </header>
        <video src="seasurfer.mp4" type="video/mp4" autoPlay loop muted></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>WELCOME</h2>
          <h3>to kitesurf</h3>
          <p>Choose from over 100 places!</p>
          <Link to="/dashboard" className="dashboard-item">
            GET STARTED
          </Link>
        </div>
      </section>
      <div className="menu">
        <div className="close-menu-box" onClick={handleToggle}>
          <IoClose className="close-menu" />
        </div>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <div>
              <p>Welcome back,</p>
              <p className="home-p">{user.name}</p>
            </div>
          )}
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        {user && (
          <button className="sign-out-btn" onClick={handleSignOut}>
            SIGN OUT
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
