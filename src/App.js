import "./App.css";
import React, { useState, useEffect } from "react";
import SettingsContext from "./Context/Settings";
import LoginContext from "./Context/Auth/context";
import Todo from "./Components/Todo";
import List from "./Components/List";
import Auth from "./Context/Auth/auth";
import Display from "./Components/Display";
import Login from "./Context/Auth/login";
import { Grid } from "@mantine/core";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const getTodoItems = async function () {
    let url = `${process.env.REACT_APP_API}/api/v1/todo`;
    const response = await axios.get(url);
    setItems(response.data.results);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    let todoItem = {
      text: text,
      difficulty: difficulty,
      assignee: assignee,
      complete: false,
    };
    const url = `${process.env.REACT_APP_API}/api/v1/todo`;

    try {
      const response = await axios.post(url, todoItem);
      setItems([...items, response.data]);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAssignee = (e) => {
    setAssignee(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  useEffect(() => {
    getTodoItems();
  }, []);

  return (
    <SettingsContext items={items} setItems={setItems}>
      <LoginContext>
        <Grid>
          <Grid.Col span={7}>
            <Auth capability="create">
              <Todo
                handleAddItem={handleAddItem}
                handleChange={handleChange}
                handleAssignee={handleAssignee}
                handleDifficulty={handleDifficulty}
              />
            </Auth>
          </Grid.Col>
          <Grid.Col span={5}>
            <Login />
            <Auth capability="create">
              <Display />
            </Auth>
            <Auth capability="create">
              <List items={items} setItems={setItems} />
            </Auth>
          </Grid.Col>
        </Grid>
      </LoginContext>
    </SettingsContext>
  );
};

export default App;
