import React, { Component } from "react";
import { getJwt } from "../helpers/jwt";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Authenticate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      redirect: false
    };
  }

  // Redirect due to invalid Token or Missing Token
  loginRedirect() {
    this.props.history.push("/login");
  }


// Verfication of token to make sure it still valid 
  componentDidMount() {
    const jwt = getJwt();
    let that = this;

    if (!jwt) {
      this.loginRedirect();
    }

    axios({
      method: "get",
      url: "http://0.0.0.0:5000/getUser",
      headers: { token: jwt }
    })
      .then(res => this.setState({ user: res.data }))
      .catch(function(error) {
        if (error.response.status === 401) {
          that.loginRedirect();
        }
      });
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          {" "}
          <h1> Loading.......</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Authenticate);
