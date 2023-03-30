import React, { useContext } from "react";
import { Group } from "@mantine/core";
import { Select, Switch } from "@mantine/core";
import { SettingsContext } from "../../Context/Settings";

const Display = () => {
  const settings = useContext(SettingsContext);

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
        onChange={settings.changeNumItems}
      />
      </label>
      <label>Completed:
      <Switch
        checked={settings.showCompleted} 
        onChange={(e) => settings.changeShowCompleted(e.currentTarget.checked)}
        />
      </label>
    </Group>
  );
};

export default Display;
