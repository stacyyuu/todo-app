import "./App.css";
import React from "react";
import SettingsContext from "./Context/Settings";
import LoginContext from "./Context/Auth/context";
import Todo from "./Components/Todo";
import List from "./Components/List";
import Display from "./Components/Display";
// import Login from "./Context/Auth/login";
import { Grid } from "@mantine/core";

const App = () => {
  return (
    <SettingsContext>
      <LoginContext>
        <Grid>
          <Grid.Col span={7}>
            <Todo />
          </Grid.Col>
          <Grid.Col span={5}>
          <Display />
          <List />
          </Grid.Col>
          {/* <Login /> */}
        </Grid>
      </LoginContext>
    </SettingsContext>
  );
};

export default App;
