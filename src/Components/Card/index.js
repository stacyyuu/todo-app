import React, { useContext } from "react";
import { Group } from "@mantine/core";
import { Select } from "@mantine/core";
import { formContext } from "../Todo/index";

const Settings = () => {
  const todoList = useContext(formContext);

  return (
      <Group position="center">
        <Select
          label="How many to do items to display:"
          placeholder="Pick one"
          data={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
            { value: 20, label: "20" },
          ]}
        />
        <Select
          label="Show completed items:"
          placeholder="Pick one"
          data={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />
      </Group>
  );
};

export default Settings;
