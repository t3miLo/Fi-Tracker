import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Userlogin } from "./components/LoginForm";
import { NavBar } from "./components/NavBar";
import { DashBoard } from "./components/DashBoard";
import { Home } from "./components/Home";
import { Register } from "./components/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <NavBar />

          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/login" component={Userlogin} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
