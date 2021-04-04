import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "./custom-hooks/useFetch";

const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Login = () => {
  const refEmail = useRef(null);
  const users = useFetch(usersUrl);

  const handleLogin = (e) => {
    // e.preventDefault();
    const email = refEmail.current.value;
    for (let user of users) {
      if (user.email === email) localStorage.setItem("user", user.id);
    }
    if (localStorage.getItem("user")) {
      //   console.log(localStorage.getItem("user"));
    } else {
      //   console.log("user inexistent");
    }
  };

  const handleLogout = (e) => {
    // e.preventDefault();
    localStorage.removeItem("user");
  };

  const checkForAuthUser = () => {
    // console.log(localStorage.getItem("user"));
    if (
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === null
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {checkForAuthUser() ? (
        <form action="">
          <input type="text" placeholder="Email" ref={refEmail} />
          <input type="password" placeholder="Password" />
          <button type="submit" onClick={handleLogin}>
            LOGIN
          </button>
        </form>
      ) : (
        <form action="">
          <button type="submit" onClick={handleLogout}>
            LOGOUT
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
