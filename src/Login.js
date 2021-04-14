import React, { useRef } from "react";
import { useFetch } from "./custom-hooks/useFetch";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { useHistory } from "react-router";
import Modal from "./ModalMsg";

const usersUrl = "https://606216fdac47190017a7267c.mockapi.io/user";

const Login = () => {
  let history = useHistory();
  const {
    closeModal,
    modalMsg,
    modalType,
    modalContent,
    isModalOpen,
  } = useGlobalContext();
  const refEmail = useRef(null);
  const users = useFetch(usersUrl);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = refEmail.current.value;
    for (let user of users) {
      if (user.email === email)
        localStorage.setItem("user", JSON.stringify(user));
    }
    try {
      if (localStorage.getItem("user")) {
        modalMsg("You've successfully logged on!", "info");
        history.push("/dashboard");
      } else {
        modalMsg("Wrong email or password. Please try again!", "error");
      }
    } catch (e) {
      console.log(e.message);
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
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            modalType={modalType}
            modalContent={modalContent}
          />
        )}
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
