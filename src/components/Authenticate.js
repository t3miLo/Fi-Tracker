import React, { Component } from "react";
import { getJwt } from "../helpers/jwt";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Authenticate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }
  componentDidMount() {
    const jwt = getJwt();
    console.log(jwt);
    if (!jwt) {
      this.props.history.push("/login");
    }

    axios({
      method: "get",
      url: "http://0.0.0.0:5000/getUser",
      headers: { token: jwt }
    })
      .then(res => this.setState({ user: res.data }))
      .catch(function(response) {
        console.log("error ++++", response);
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
