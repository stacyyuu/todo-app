import "./App.css";
import React from "react";
import { SettingsContext } from "./Context/Settings";
import Todo from "./Components/Todo";
import List from "./Components/List";
import Display from "./Components/Display";

const App = () => {
  return (
    <SettingsContext>
      <Todo />
      <List />
      <Display />
    </SettingsContext>
  );
};

export default App;
