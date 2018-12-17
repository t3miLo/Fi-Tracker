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
      id: 0
    };
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  handleAddItem(item) {
    let id = this.state.id;
    item["_id"] = id;
    let arr = this.state.debts;
    arr.push(item);
    this.setState({ debts: arr, id: id + 1 });
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
