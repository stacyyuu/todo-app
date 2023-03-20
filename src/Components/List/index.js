import React, { useContext, useState } from "react";
import { formContext } from "../Todo/index";
import { Pagination } from "@mantine/core";

const List = () => {
  const [activePage, setPage] = useState(1);
  const todoList = useContext(formContext);
  const todoItems = todoList.list;


  return (
    <>
      {todoItems.map(
        (item) =>
          item.complete === false && (
            <div key={item.id}>
              <p>{item.text}</p>
              <p>
                <small>Assigned to: {item.assignee}</small>
              </p>
              <p>
                <small>Difficulty: {item.difficulty}</small>
              </p>
              <div onClick={() => todoList.toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </div>
              <hr />
            </div>
          )
      )}

      <Pagination
        value={activePage}
        onChange={setPage}
        total={todoItems / 3}
        boundaries = {3}
      />
    </>
  );
};

export default List;
