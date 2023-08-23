import React, { useContext, useState } from "react";
import { Group } from "@mantine/core";
import { Select, Switch } from "@mantine/core";
import { SettingsContext } from "../../Context/Settings";

const Display = () => {
  const settings = useContext(SettingsContext);

  const changeSwitch = (e) => {
    settings.changeShowCompleted(e);
  };

  return (
    <Group position="center">
      <label>Display Items:
      <Select
        placeholder={5}
        data={[
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 15, label: "15" },
          { value: 20, label: "20" },
        ]}
        onChange={settings.changeNumItems}
      />
      </label>
      <label>Completed:
      <Switch
        onChange={(e) => changeSwitch(e)}
        />
      </label>
    </Group>
  );
};

export default Display;
