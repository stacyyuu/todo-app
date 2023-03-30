import React, { useState, useEffect, createContext } from "react";

export const SettingsContext = createContext();

const Settings = (props) => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [numItems, setNumItems] = useState(3);

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

  // Proxy Function
  const addItemToList = (item) => setList([...list, item]);

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
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  useEffect(() => {
    let savedBoolean = localStorage.getItem("Show completed");
    let savedNumItems = localStorage.getItem("Items displayed") || numItems;
    changeShowCompleted(savedBoolean);
    changeNumItems(savedNumItems);
  }, []);

  let exportedSettings = {
    defaultValues,
    list,
    incomplete,
    addItemToList,
    toggleComplete,
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
