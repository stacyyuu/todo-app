import React, { useState, useEffect, createContext } from "react";

export const SettingsContext = createContext();

const Settings = (props) => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [showCompleted, setShowCompleted] = useState(false);
  const [numItems, setNumItems] = useState(3);

  const changeShowCompleted = (answer) => {
    localStorage.setItem("Show completed", answer);
    setShowCompleted(answer);
  };

  const changeNumItems = (num) => {
    num = Number(num);
    localStorage.setItem("Items displayed", num);
    setNumItems(num);
  };

  const toggleComplete = async (item) => {

  };

  useEffect(() => {
    let savedBoolean = localStorage.getItem("Show completed");
    let savedNumItems = localStorage.getItem("Items displayed");
    changeShowCompleted(savedBoolean);
    changeNumItems(savedNumItems);
  }, []);

  let exportedSettings = {
    defaultValues,
    showCompleted,
    numItems,
    toggleComplete,
    changeShowCompleted,
    changeNumItems,
  };

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default Settings;
