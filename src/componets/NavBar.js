import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";


export class NavBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand> Fi Tracker </Navbar.Brand> <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/dashboard">Dashboard</NavItem>

            <NavItem href="/login">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
