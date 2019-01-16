import React, { Component } from "react";

export class DeleteModal extends Component {
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

  deleteItem() {
    const {getId} = this.props
    const itemID = this.props.debt._id.$oid;
    getId(itemID);
    
  };

  render() {
    return (
      <div className="float-left">
        <button
          type="button"
          className="btn btn-danger m-2"
          data-toggle="modal"
          data-target="#itemModalDelete">
          Delete
        </button>
        <div
          className="modal fade"
          id="itemModalDelete"
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
                <p>
                  {" "}
                  Are you sure you would like to Delete {
                    this.props.debt.name
                  }{" "}
                  item?
                </p>
              </div>
              <div className="modal-footer justify-content-between">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal">
                  Cancel
                </button>
                <button
                  onClick={this.deleteItem.bind(this)}
                  type="button"
                  className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteModal;
