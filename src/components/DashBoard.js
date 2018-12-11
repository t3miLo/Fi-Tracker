import React, { Component } from "react";
import { AddDebt } from "./AddDebt";
import { ItemCard } from "./itemCard";

const mTop = {
  marginTop: "20px"
};

export class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  handleAddItem(item) {
    this.setState(function() {
      return {
        item
      };
    });
  }

  render() {
    return (
      <div className="container-fluid" style={mTop}>
        <div className="row h-100 bg-light">
          <AddDebt addItemCallBack={this.handleAddItem} />
          <ItemCard itemData={this.state.item} />
        </div>
      </div>
    );
  }
}
