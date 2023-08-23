import React, { useContext } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  Slider,
  Grid,
  Center,
} from "@mantine/core";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
import { SettingsContext }  from "../../Context/Settings";


const Todo = (props) => {
  const settings = useContext(SettingsContext);
  const { handleChange, handleSubmit } = useForm(addItem, settings.defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    props.handleAddItem(item);
  }

  return (
    <>
      <Center>
        <header data-testid="todo-header">
          <h1 data-testid="todo-h1">To Do List: {settings.incomplete ? settings.incomplete : 0} items pending</h1>
        </header>
      </Center>

      <Grid>
        <Grid.Col span={6}>
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
                defaultValue={settings.defaultValues.difficulty}
                onChange={handleChange}
              />
              <Group position="right" mt="xl">
                <Button type="submit">Add Item</Button>
              </Group>
            </form>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Todo;
