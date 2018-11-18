import React, { Component } from "react";
import "./App.css";
import { Userlogin } from "./componets/LoginForm";

const centerMargin = {
  margin: '2em auto',
};

const padding = {
  padding: '2em'
}
class App extends Component {
  render() {
    return (
      <div className="App" style={centerMargin}>
        <Userlogin style={padding} />
      </div>
    );
  }
}

export default App;
