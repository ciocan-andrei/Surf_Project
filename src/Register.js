import React, { useRef } from "react";
import { useFetch } from "./custom-hooks/useFetch";
import { useHistory } from "react-router";

const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Register = () => {
  let history = useHistory();

  const refEmail = useRef(null);
  const refName = useRef(null);
  const refFirstPass = useRef(null);
  const refSecondPass = useRef(null);

  const users = useFetch(usersUrl);

  const handleLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(refEmail.current.value)) {
        throw new Error("Email is invalid!");
      }
      for (let user of users) {
        if (user.email === refEmail.current.value) {
          throw new Error("Email is already used!");
        }
      }
      if (refFirstPass.current.value !== refSecondPass.current.value) {
        throw new Error("Wrong password!");
      } else {
        const res = await fetch(usersUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: refName.current.value,
            createdAt: new Date(),
            email: refEmail.current.value,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          await handleLogin(data);
          history.push("/dashboard");
        }
      }
    } catch (e) {
      console.log(e.message);
    }
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
            <form action="" className="login-flex">
              <div>
                <input
                  className="login-input"
                  required={true}
                  type="text"
                  ref={refName}
                />
                <label className="input-label">Name</label>
              </div>
              <div>
                <input
                  className="login-input"
                  required={true}
                  type="text"
                  ref={refEmail}
                />
                <label className="input-label">Email</label>
              </div>
              <div>
                <input
                  className="login-input"
                  required={true}
                  type="password"
                  ref={refFirstPass}
                />
                <label className="input-label">Password</label>
              </div>
              <div>
                <input
                  className="login-input"
                  required={true}
                  type="password"
                  ref={refSecondPass}
                />
                <label className="input-label">Confirm Password</label>
              </div>
              <button
                className="login-btn"
                type="submit"
                onClick={handleRegister}
              >
                REGISTER
              </button>
            </form>
          ) : (
            <div className="logout-flex">
              <p>You are already registered,</p>
              <h4>{loggedUser.name}</h4>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Register;
