import React, { Component } from "react";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";

export class ItemCard extends Component {
  render() {
    const { deleteItemCallBack } = this.props;
    return (
      <div className="container-fluid col-md-auto col-lg-auto col-sm-12 col-8">
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
                      <DeleteModal
                        debt={debt}
                        getId={
                          (id => {
                            deleteItemCallBack(id);
                          })
                        }
                      />
                      <Modal debt={debt} />
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
