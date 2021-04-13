import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "./custom-hooks/useFetch";
import { Link } from "react-router-dom";

const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Login = () => {
  const refEmail = useRef(null);
  const users = useFetch(usersUrl);

  const handleLogin = (e) => {
    // e.preventDefault();
    const email = refEmail.current.value;
    for (let user of users) {
      if (user.email === email)
        localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const handleLogout = (e) => {
    // e.preventDefault();
    localStorage.removeItem("user");
  };

  let loggedUser = null;
  if (localStorage.getItem("user")) {
    loggedUser = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <div className="bg-color">
      <section className="login-page">
        <div className="login-form">
          <img className="login-img" src="pexels-kitesurf.jpeg" alt="" />

          {!loggedUser ? (
            <form className="login-flex">
              <div>
                <input
                  className="login-input"
                  type="text"
                  required={true}
                  ref={refEmail}
                />
                <label className="input-label">Email</label>
              </div>
              <div>
                <input
                  className="login-input"
                  required={true}
                  type="password"
                />
                <label className="input-label">Password</label>
              </div>
              <button className="login-btn" type="submit" onClick={handleLogin}>
                LOG IN
              </button>
              <p className="login-text">
                Not yet registered?{" "}
                <Link className="login-link" to="/register">
                  Sign up
                </Link>{" "}
                now!
              </p>
            </form>
          ) : (
            <form action="" className="logout-flex">
              <p>You are logged as</p>
              <h4>{loggedUser.name}</h4>
              <button
                className="login-btn"
                type="submit"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
