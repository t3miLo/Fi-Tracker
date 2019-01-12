import React, { Component } from "react";

export default class UpdateItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
      totalAmount: "",
      interest: "",
      payment: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.name !== nextProps.name) {
      return {
        name: nextProps.name
      };
    }
    if (prevState.type !== nextProps.type) {
      return {
        type: nextProps.type
      };
    }
    if (prevState.totalAmount !== nextProps.amount) {
      return {
        totalAmount: nextProps.amount
      };
    }
    if (prevState.interest !== nextProps.interest) {
      return {
        interest: nextProps.interest
      };
    }
    if (prevState.payment !== nextProps.payment) {
      return {
        payment: nextProps.payment
      };
    }
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);

    this.setState({
      [name]: value
    });
  }

  render() {
    const item = this.props;
    return (
      <form action="">
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="itemType">
            Type:{" "}
          </label>

          <input
            onChange={this.handleChange}
            type="text"
            name="itemType"
            id="itemType"
            value={this.state.type}
          />
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="totalAmount">
            Total Due:{" "}
          </label>

          <input
            type="text"
            name="totalAmount"
            id="TotalAmount"
            value={this.state.totalAmount}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="interest">
            Interest:{" "}
          </label>

          <input
            type="text"
            name="interest"
            id="interest"
            onChange={this.handleChange}
            value={this.state.interest}
          />
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="payment">
            Payments:{" "}
          </label>

          <input
            type="text"
            name="payment"
            id="payment"
            onChange={this.handleChange}
            value={this.state.payment}
          />
        </div>
      </form>
    );
  }
}
