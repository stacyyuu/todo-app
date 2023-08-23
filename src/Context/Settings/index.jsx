import React, { useState, useEffect, createContext } from "react";

export const SettingsContext = createContext();

const Settings = (props) => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [showCompleted, setShowCompleted] = useState(false);
  const [numItems, setNumItems] = useState(3);

  const items = props.items;
  const setItems = props.setItems;

  const changeShowCompleted = (answer) => {
    localStorage.setItem("Show completed", answer);
    setShowCompleted(answer);
  };

  const changeNumItems = (num) => {
    num = Number(num);
    localStorage.setItem("Items displayed", num);
    setNumItems(num);
  };


  useEffect(() => {
    let savedBoolean = localStorage.getItem("Show completed");
    let savedNumItems = localStorage.getItem("Items displayed");
    
    if (!showCompleted){
      setItems(items.filter((item) => !item.complete));
    } else {
      setItems(items);
    }

    changeNumItems(savedNumItems);
    changeShowCompleted(savedBoolean);

  }, [items, setItems, showCompleted]);

  let exportedSettings = {
    defaultValues,
    showCompleted,
    numItems,
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
