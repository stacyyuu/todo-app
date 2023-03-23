import React, { useEffect, useState, createContext } from "react";
import { TextInput, Button, Group, Box, Slider } from "@mantine/core";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
import List from "../List/index";
import Settings from "../Card/index";

export const formContext = createContext("");

const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
    itemsShown: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <>
      <header data-testid="todo-header" >
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <Box maw={300} mx="auto">
        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item:</h2>
          <TextInput
            label="To Do Item"
            name="text"
            type="text"
            placeholder="Item Details"
            onChange={handleChange}
          />

          <TextInput
            label="Assigned To"
            name="assignee"
            type="text"
            placeholder="Assignee Name"
            onChange={handleChange}
          />

          <Slider
            label="Difficulty"
            placeholder="Difficulty"
            radius="xl"
            min={1}
            max={5}
            marks={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
            ]}
            defaultValue={defaultValues.difficulty}
            onChange={handleChange}
          />

          <Group position="right" mt="xl">
            <Button type="submit">Add Item</Button>
          </Group>
        </form>
      </Box>

      <formContext.Provider value={{ list, toggleComplete, defaultValues }}>
        <Settings />
        <List />
      </formContext.Provider>
    </>
  );
};

export default Todo;
