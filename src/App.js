import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Userlogin } from "./components/LoginForm";
import { NavBar } from "./components/NavBar";
import { DashBoard } from "./components/DashBoard";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import Authenticate from "./components/Authenticate";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid bg-light">
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" component={Authenticate} />
            <Route path="/login" component={Userlogin} />
            <Route path="/register" component={Register} />
            <Authenticate>
              <Route path="/dashboard" component={DashBoard} />
            </Authenticate>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
