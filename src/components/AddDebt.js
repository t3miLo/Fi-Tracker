import React, { Component } from "react";


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
      type: "",
      minPayment: ""
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

    console.log(name, " : ", value);
  }

  render() {
    return (
         
          <div className="col-md-4 border border-dark rounded m-3">
            <h5 className="text-center pt-3">Add your debt </h5>
            <form style={fPadding} className="align-items-center">
              {/* Name group */}
              <div className="form-group row">
                <label
                  htmlFor="companyName"
                  className="col-sm-2 col-form-label">
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
                <label
                  htmlFor="totalAmount"
                  className="col-sm-2 col-form-label">
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
                <label htmlFor="debtType" className="col-sm-2 col-form-label">
                  Type
                </label>
                <div style={lPadding}>
                  <select
                    id="debtType"
                    value={this.state.value}
                    name="debtType"
                    onChange={this.handleChange}>
                    <option value="creditcard">Credit Card</option>
                    <option value="carloan">Car Loan</option>
                    <option value="studentloan">Student Loan</option>
                    <option value="homeloan">Home Loan</option>
                  </select>
                </div>
              </div>
              {/* Type group end */}
              {/* APR group start */}
              <div className="form-group row">
                <label htmlFor="apr" className="col-sm-2 col-form-label">
                  APR
                </label>
                <div className="col-sm-10" style={lPadding}>
                  <input
                    type="text"
                    className="form-control"
                    id="apr"
                    placeholder="Interest"
                    value={this.state.value}
                    onChange={this.handleChange}
                    name="apr"
                  />
                </div>
              </div>
              {/* APR group end  */}
              {/* MonthlyPayment group start */}
              <div className="form-group row">
                <label
                  htmlFor="monthlyPayment"
                  className="col-sm-2 col-form-label">
                  Payment
                </label>
                <div className="col-sm-10" style={lPadding}>
                  <input
                    type="number"
                    name="monthlyPayment"
                    className="form-control"
                    id="monthlyPayment"
                    placeholder="Total Due"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* MonthlyPayment group end */}
              <div className="form-group row float-left">
                <div>
                  <input
                    className="btn btn-danger"
                    type="reset"
                    value="clear"
                  />
                </div>
              </div>
              <div className="form-group row float-right">
                <div>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="add"
                  />
                </div>
              </div>
            </form>
          </div>
     
    );
  }
}
