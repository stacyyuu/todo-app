import React from "react";
import { If, Then, Else } from "react-if";
import { LoginContext } from "./context.jsx";
import { TextInput, Box, Button } from "@mantine/core";

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <If condition={this.context.loggedIn}>
        <Then>
          <button onClick={this.context.logout}>Log Out</button>
        </Then>
        <Else>
          <Box maw={200} mx="auto">
            <form onSubmit={this.handleSubmit}>
              <TextInput
                name="username"
                placeholder="login id"
                onChange={this.handleChange}
              />
              <TextInput
                name="password"
                type="password"
                placeholder="password"
                onChange={this.handleChange}
              />

              <button>Login</button>
            </form>
          </Box>
        </Else>
      </If>
    );
  }
}

export default Login;
