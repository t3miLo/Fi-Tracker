import React, { Component } from "react";
import UpdateItem from "./UpdateItem";

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.showModal !== nextProps.modalStatus) {
      return {
        showModal: nextProps.modalStatus
      };
    }
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2"
          data-toggle="modal"
          data-target="#itemModal">
          Update
        </button>
        <div
          className="modal fade"
          id="itemModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="itemModalTitle"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content text-center bg-dark">
              <div className="modal-header">
                <h5 className="modal-title text-light" id="itemModalTitle">
                  {this.props.debt.name}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body bg-info">
                <UpdateItem item={this.props.debt} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
