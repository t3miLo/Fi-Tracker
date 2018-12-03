import React, { Component } from "react";

const contentPad = {
  padding: "10px",
  background: "gray",
  overflow: "auto"
};

const clear = {
  clear: "both"
};

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleChange = this.handleChange.bind(this);
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
      <div className="container text-center">
        <div
          className="border border-dark rounded m-3 align-center "
          style={contentPad}>
          <h5 className="text-center pt-3"> Register Now! </h5>{" "}
          <form action="" className="align-items-center ">
            {" "}
            {/* username */}{" "}
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-4 col-form-label">
                Username{" "}
              </label>{" "}
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  palceholder="Username"
                  value={this.state.value}
                  onChange={this.handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* username */} {/* email */}{" "}
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-4 col-form-label">
                Email{" "}
              </label>{" "}
              <div className="col-sm-7">
                <input
                  type="email"
                  className="form-control"
                  id="email;"
                  name="email"
                  palceholder="email"
                  value={this.state.value}
                  onChange={this.handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* email */} {/* password */}{" "}
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-4 col-form-label">
                Password{" "}
              </label>{" "}
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  palceholder="Password"
                  value={this.state.value}
                  onChange={this.handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* password */} {/* confirm password */}{" "}
            <div className="form-group row">
              <label
                htmlFor="confirmPassword"
                className="col-sm-4 col-form-label">
                Confirm Password{" "}
              </label>{" "}
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  palceholder="Confirm Password"
                  value={this.state.value}
                  onChange={this.handleChange}
                />{" "}
              </div>{" "}
            </div>{" "}
            {/* confirm password */} {/* Reset Button */}{" "}
            <div className="form-group row float-left ">
              <input className="btn btn-danger" type="reset" value="Clear" />
            </div>
            {/* Reset Button */} {/* Register Button */}{" "}
            <div className="form-group row float-right">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register!"
              />
            </div>{" "}
            <div style={clear} /> {/* Register Button */}{" "}
          </form>{" "}
        </div>{" "}
      </div>
    );
  }
}
