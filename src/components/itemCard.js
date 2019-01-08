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
                  <div className="card bg-dark mt-3">
                    <div className="card-header text-light"> {debt.name}</div>
                    <div className="card-body bg-info">
                      <div className="clearfix">
                        <div className="float-left">Type :</div>
                        <div className="float-right">{debt.type}</div>
                      </div>
                      <div className="clearfix">
                        <div className="float-left">Total Due :</div>
                        <div className="float-right">${debt.totalAmount}</div>
                      </div>
                      <div className="clearfix">
                        <div className="float-left"> Interest :</div>
                        <div className="float-right"> {debt.interest} %</div>
                      </div>
                      <div className="clearfix">
                        <div className="float-left"> Payments :</div>
                        <div className="float-right">${debt.payment}</div>
                      </div>
                    </div>
                    <div className="clearfix">
                      <button className="btn btn-danger btn-m float-left mt-2 ml-4 mr-2">
                        Delete
                      </button>
                      <Modal className="float-right" debt={debt} />
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
