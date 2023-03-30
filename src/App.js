import "./App.css";
import React from "react";
import SettingsContext from "./Context/Settings";
import LoginContext from "./Context/Auth/context";
import Todo from "./Components/Todo";
import List from "./Components/List";
import Auth from './Context/Auth/auth'
import Display from "./Components/Display";
import Login from "./Context/Auth/login";
import { Grid } from "@mantine/core";

const App = () => {
  return (
    <SettingsContext>
      <LoginContext>
        <Grid>
          <Grid.Col span={7}>
          <Auth capability="create">
            <Todo />
            </Auth>
          </Grid.Col>
          <Grid.Col span={5}>
          <Login />
          <Display />
          <List />
          </Grid.Col>
        </Grid>
      </LoginContext>
    </SettingsContext>
  );
};

export default App;
