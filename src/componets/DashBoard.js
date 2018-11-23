import React, { Component } from "react";
import { AddDebt } from "./AddDebt";
import { ItemCard } from "./itemCard";

const mTop = {
  marginTop: "20px"
};

export class DashBoard extends Component {
  render() {
    return (
      <div className="container-fluid" style={mTop}>
        <div className="row h-100 bg-light">
          <AddDebt />
          <ItemCard />
        </div>
      </div>
    );
  }
}
