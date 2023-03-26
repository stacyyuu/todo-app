import React, { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { Pagination } from "@mantine/core";

const List = (props) => {
  const [activePage, setPage] = useState(1);
  const settings = useContext(SettingsContext);
  const todoItems = settings.list;
  const itemsPerPage = settings.numItems;

  const pageCount = Math.ceil(todoItems.length / itemsPerPage);
  const displayedItems = todoItems.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // start = 0; end = start + settings.num;, display = people.slice(start, end);
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
                onClick={() => settings.toggleComplete(item.id)}
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
