import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Register from "./Register";
import About from "./About";

const RouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Navbar />
          <Sidebar />
          <Login />
        </Route>
        <Route path="/register">
          <Navbar />
          <Sidebar />
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Sidebar />
          <Dashboard />
        </Route>
        <Route path="/about">
          <Navbar />
          <Sidebar />
          <About />
        </Route>
        <Route path="*">
          <Navbar />
          <Sidebar />
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterSetup;
