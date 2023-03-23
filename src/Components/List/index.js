import React, { useContext, useState } from "react";
import { formContext } from "../Todo/index";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { Pagination } from "@mantine/core";

const List = () => {
  const [activePage, setPage] = useState(1);
  const todoList = useContext(formContext);
  const todoItems = todoList.list;
  const itemsPerPage = todoList.defaultValues.itemsShown;

  const pageCount = Math.ceil(todoItems.length / itemsPerPage);
  const displayedItems = todoItems.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      {displayedItems.map(
        (item) =>
          item.complete === false && (
            <Card shadow="sm" padding="lg" radius="md" key={item.id} withBorder>
              <Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500}>{item.text}</Text>
                  <Badge color="pink" variant="light">
                    Difficulty: {item.difficulty}
                  </Badge>
                </Group>
              </Card.Section>
              <Text size="sm">Assigned to: {item.assignee}</Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => todoList.toggleComplete(item.id)}
              >
                Complete: {item.complete.toString()}
              </Button>
            </Card>
          )
      )}

      <Pagination
        current={activePage}
        onChange={handlePageChange}
        total={pageCount}
        boundaries={3}
        position="center"
      />
    </>
  );
};

export default List;
