import React, { useContext } from "react";
import { Group } from "@mantine/core";
import { Select, Switch } from "@mantine/core";

const Display = () => {

  return (
    <Group position="center">
      <label>Display Items:
      <Select
        placeholder="Pick one"
        data={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 15, label: "15" },
          { value: 20, label: "20" },
        ]}
      />
      </label>
      <label>Completed:
      <Switch
        onLabel="ON" offLabel="OFF" 
      />
      </label>
    </Group>
  );
};

export default Display;
