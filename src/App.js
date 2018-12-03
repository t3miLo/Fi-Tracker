import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Userlogin } from "./componets/LoginForm";
import { NavBar } from "./componets/NavBar";
import { DashBoard } from "./componets/DashBoard";
import { Home } from "./componets/Home";
import { Register } from "./componets/Register";

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
