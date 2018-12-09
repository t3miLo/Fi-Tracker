import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
  Col,
  Checkbox
} from "react-bootstrap";

const padding = {
  padding: "10px"
};

const mTop = {
  marginTop: "20px",
  background: "gray"
};

export class Userlogin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: ""
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

  getValidationState = () => {
    const value = this.state.password.length;
    if (value > 10) return "success";
    else if (value > 6) return "warning";
    else if (value > 0) return "error";
    return null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const bodyData = new FormData(e.target);
    bodyData.set("email", this.state.email);
    bodyData.set("password", this.state.password);

    axios({
      method: "post",
      url: "http://0.0.0.0:5000/auth",
      data: bodyData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(res => localStorage.setItem("cool-jwt", res.data.user.token))
      .catch(function(response) {
        console.log("error ++++", response);
      });
  };

  render() {
    return (
      <div id="loginForm" className="shawdow container-fluid" style={mTop}>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalEmail" style={padding}>
            <Col componentClass={ControlLabel} sm={2}>
              Email{" "}
            </Col>{" "}
            <Col sm={10}>
              <FormControl
                type="email"
                name="email"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Col>{" "}
          </FormGroup>{" "}
          <FormGroup
            validationState={this.getValidationState()}
            controlId="formHorizontalPassword"
            style={padding}>
            <Col componentClass={ControlLabel} sm={2}>
              Password{" "}
            </Col>{" "}
            <Col sm={10}>
              <FormControl
                value={this.state.value}
                onChange={this.handleChange}
                name="password"
                type="password"
                placeholder="Password"
              />
              <FormControl.Feedback />
            </Col>{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox> Remember me </Checkbox>{" "}
            </Col>{" "}
          </FormGroup>{" "}
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit"> Sign in </Button>{" "}
            </Col>{" "}
          </FormGroup>{" "}
        </Form>{" "}
      </div>
    );
  }
}
