import React, { Component } from "react";
import Toggle from "./ToggleRenderProps";
import Modal from "./Modal";

export class ItemCard extends Component {
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
                    <Modal debt={debt}/>
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
