import React, { Component } from "react";
import UpdateItem from './UpdateItem'


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
        class="btn btn-primary m-2"
        data-toggle="modal"
        data-target="#itemModal">
        Update
      </button>
      <div
        class="modal fade"
        id="itemModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="itemModalTitle"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content text-center">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="itemModalTitle">
                {this.props.debt.name}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <UpdateItem item={this.props.debt}/>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary">
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
