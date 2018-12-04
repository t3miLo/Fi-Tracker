import React, { Component } from "react";
import { getJwt } from "../helpers/jwt";
import { withRouter } from "react-router-dom";
import {getUser} from '../utils/api'
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
   
    if (!jwt) {
      this.props.history.push("/login");
    }

    axios({
      method: "post",
      url: "http://0.0.0.0:5000/auth",
      config: { headers: { "Authorization": "Bear $"+{jwt} } }
    })
      .then(res => res.setState({ user: res.data}))
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
