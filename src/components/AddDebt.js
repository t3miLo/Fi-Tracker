import React, { Component } from "react";
import Axios from "axios";

const fPadding = {
  padding: "10px"
};

const lPadding = {
  paddingLeft: "30px"
};

export class AddDebt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      totalAmount: "",
      interest: "",
      type: "Credit Card",
      payment: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { addItemCallBack } = this.props;
    const item = {
      name: this.state.name,
      totalAmount: this.state.totalAmount,
      interest: this.state.interest,
      type: this.state.type,
      payment: this.state.payment
    };

    const itemData = new FormData(e.target);
    itemData.set("name", this.state.name);
    itemData.set("totalAmount", this.state.totalAmount);
    itemData.set("interest", this.state.interest);
    itemData.set("type", this.state.type);
    itemData.set("payment", this.state.payment);
    addItemCallBack(item);

    Axios({
      method: "post",
      url: "http://0.0.0.0:5000/addDebt",
      data: itemData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(res => console.log(res))
      .catch(function(error) {
        console.log(error.response);
      });
  };

  render() {
    return (
      <div className="col-md-4 border border-dark rounded m-3">
        <h5 className="text-center pt-3">Add your debt </h5>
        <form
          style={fPadding}
          className="align-items-center"
          onSubmit={this.handleSubmit}>
          {/* Name group */}
          <div className="form-group row">
            <label htmlFor="companyName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10" style={lPadding}>
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="name"
                placeholder="Name"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* Name group end */}
          {/* Total Amount group */}
          <div className="form-group row">
            <label htmlFor="totalAmount" className="col-sm-2 col-form-label">
              Total Amount
            </label>
            <div className="col-sm-10" style={lPadding}>
              <input
                type="number"
                name="totalAmount"
                className="form-control"
                id="totalAmount"
                placeholder="Total Due"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* Total Amount group end */}
          {/* Type group */}
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-2 col-form-label">
              Type
            </label>
            <div style={lPadding}>
              <select
                id="type"
                value={this.state.value}
                name="type"
                onChange={this.handleChange}>
                <option value="Credit Card">Credit Card</option>
                <option value="Car Loan">Car Loan</option>
                <option value="Student Loan">Student Loan</option>
                <option value="Home Loan">Home Loan</option>
              </select>
            </div>
          </div>
          {/* Type group end */}
          {/* interest group start */}
          <div className="form-group row">
            <label htmlFor="interest" className="col-sm-2 col-form-label">
              APR
            </label>
            <div className="col-sm-10" style={lPadding}>
              <input
                type="text"
                className="form-control"
                id="interest"
                placeholder="Interest"
                value={this.state.value}
                onChange={this.handleChange}
                name="interest"
              />
            </div>
          </div>
          {/* Interest group end  */}
          {/* MonthlyPayment group start */}
          <div className="form-group row">
            <label htmlFor="monthlyPayment" className="col-sm-2 col-form-label">
              Payment
            </label>
            <div className="col-sm-10" style={lPadding}>
              <input
                type="number"
                name="payment"
                className="form-control"
                id="payment"
                placeholder="Total Due"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* MonthlyPayment group end */}
          <div className="form-group row float-left">
            <div>
              <input className="btn btn-danger" type="reset" value="clear" />
            </div>
          </div>
          <div className="form-group row float-right">
            <div>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
