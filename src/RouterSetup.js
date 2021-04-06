import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import Login from "./Login";

const RouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Navbar />
          <Login />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="*">
          <Navbar />
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterSetup;
