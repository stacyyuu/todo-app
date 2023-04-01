import React, {useState, useContext} from "react";
import { If, Then, Else } from "react-if";
import { LoginContext } from "./context.jsx";
import { TextInput, Box, Button } from "@mantine/core";


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginSettings = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginSettings.userLogin(username, password);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <If condition={loginSettings.loggedIn}>
      <Then>
        <button onClick={loginSettings.userLogout}>Log Out</button>
      </Then>
      <Else>
        <Box maw={200} mx="auto">
          <form onSubmit={handleSubmit}>
            <TextInput
              name="username"
              placeholder="login id"
              onChange={handleUsername}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="password"
              onChange={handlePassword}
            />

            <button>Login</button>
          </form>
        </Box>
      </Else>
    </If>
  );
}


export default Login;
