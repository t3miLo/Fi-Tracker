import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
        <Link to="/" className="navbar-brand d-flex w-50 mr-auto">
          Fi-Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsingNavbar">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse w-100" id="collapsingNavbar">
          <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                DashBoard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
