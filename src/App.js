import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Userlogin } from "./componets/LoginForm";
import { NavBar } from "./componets/NavBar";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <NavBar />
          <Route path="/login" component={Userlogin} className="text-center" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
