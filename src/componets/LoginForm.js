import React, { Component } from "react";
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

const background = {
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

  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    console.log("Email Value : " + this.state.email);
    console.log("password Value : " + this.state.password);

  };

  render() {
    return (
      <div id="loginForm" className="shawdow" style={background}>
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
