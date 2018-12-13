import React, { Component } from "react";
// import { fetchAllDebts } from "../utils/api";

export class ItemCard extends Component {
  constructor(props) {
    super();
    this.state = {
      user: null
    };
  }

  render() {
    return (
      <div className="col-md-7">
        {!this.props.debts ? (
          <p>LOADING.........</p>
        ) : (
          <div className="card-columns cardDiv">
            {this.props.debts.map(function(debt, index) {
              return (
                <div key={debt["_id"]["$oid"]}>
                  <div className="card bg-secondary mt-3">
                    <div className="card-header"> {debt.name}</div>
                    <div className="card-body">
                      <div> Type : {debt.type}</div>
                      <div> Total Amount : ${debt.totalAmount}</div>
                      <div> Interest : {debt.interest} %</div>
                      <div> Payments : ${debt.payment}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
