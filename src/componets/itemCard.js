import React, { Component } from "react";

const cardWith = {
  width: "18rem"
};


export class ItemCard extends Component {
  render() {
    return (
      <div className="col-md-9 card-columns" >
        <div className="card bg-secondary mb-3 m-3" style={cardWith}>
          <div className="card-header">Debtor</div>
          <div className="card-body">
            <p>Total Amount : $ 1,000</p>
            <p>Type : Credit Card</p>
            <p>APR : 10.2 %</p>
            <p>Montlhy Payment : $ 75</p>
          </div>
        </div>
        <div className="card bg-secondary mb-3 m-3" style={cardWith}>
          <div className="card-header">Debtor</div>
          <div className="card-body">
            <p>Total Amount : $ 1,000</p>
            <p>Type : Credit Card</p>
            <p>APR : 10.2 %</p>
            <p>Montlhy Payment : $ 75</p>
          </div>
        </div>
        <div className="card bg-secondary mb-3 m-3" style={cardWith}>
          <div className="card-header">Debtor</div>
          <div className="card-body">
            <p>Total Amount : $ 1,000</p>
            <p>Type : Credit Card</p>
            <p>APR : 10.2 %</p>
            <p>Montlhy Payment : $ 75</p>
          </div>
        </div>
        <div className="card bg-secondary mb-3 m-3" style={cardWith}>
          <div className="card-header">Debtor</div>
          <div className="card-body">
            <p>Total Amount : $ 1,000</p>
            <p>Type : Credit Card</p>
            <p>APR : 10.2 %</p>
            <p>Montlhy Payment : $ 75</p>
          </div>
        </div>{" "}
        <div className="card bg-secondary mb-3 m-3" style={cardWith}>
          <div className="card-header">Debtor</div>
          <div className="card-body">
            <p>Total Amount : $ 1,000</p>
            <p>Type : Credit Card</p>
            <p>APR : 10.2 %</p>
            <p>Montlhy Payment : $ 75</p>
          </div>
        </div>
      </div>
    );
  }
}
