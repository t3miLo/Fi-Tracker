import React, { Component } from "react";
import {
  Container,
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
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("Form Value : " + this.state.value);
  }

  render() {
    return (
      <div id="loginForm" className="shawdow" style={background}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail" style={padding}>
            <Col componentClass={ControlLabel} sm={2}>
              Email{" "}
            </Col>{" "}
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>{" "}
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" style={padding}>
            <Col componentClass={ControlLabel} sm={2}>
              Password{" "}
            </Col>{" "}
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>{" "}
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox> Remember me </Checkbox>{" "}
            </Col>{" "}
          </FormGroup>
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
