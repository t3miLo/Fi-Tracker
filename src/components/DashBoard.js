import React, { Component } from "react";
import { AddDebt } from "./AddDebt";
import { ItemCard } from "./itemCard";
import { fetchAllDebts } from "../utils/api";

const mTop = {
  marginTop: "20px"
};

export class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemUpdated: false
    };
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  handleAddItem(item) {
    this.setState(function() {
      return {
        itemUpdated: true
      };
    });
  }

  componentDidMount() {
    fetchAllDebts().then(
      function(debts) {
        this.setState(function() {
          return {
            debts
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="container-fluid" style={mTop}>
        <div className="row h-100 bg-light">
          <AddDebt addItemCallBack={this.handleAddItem} />
          <ItemCard
            itemUpdated={this.state.itemUpdated}
            debts={this.state.debts}
          />
        </div>
      </div>
    );
  }
}
