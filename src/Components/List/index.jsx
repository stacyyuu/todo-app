import React, { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { Pagination } from "@mantine/core";
import axios from "axios";

const List = (props) => {
  const settings = useContext(SettingsContext);
  const [activePage, setPage] = useState(1);

  const items = props.items;
  const setItems = props.setItems;
  const itemsPerPage = settings.numItems;

  const start = (activePage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedItems = items.slice(start, end);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const toggleComplete = async (item) => {
    const url = `${process.env.REACT_APP_API}/api/v1/todo/${item._id}`;

    try {
      await axios.put(url, {
        ...item,
        complete: !item.complete,
      });
      const updatedItems = items.map((i) =>
        i._id === item._id ? { ...item, complete: !item.complete } : i
      );

      setItems(
        settings.showCompleted
          ? updatedItems
          : updatedItems.filter((i) => !i.complete)
      );
    } catch (error) {
      console.error(error.message);
    }
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
                onClick={() => toggleComplete(item)}
              >
                Complete: {item.complete.toString()}
              </Button>
            </Card>
          )
      )}

      <Pagination
        value={activePage}
        onChange={handlePageChange}
        total={items.length / itemsPerPage + 1}
        limit={itemsPerPage}
        position="center"
      />
    </>
  );
};

export default List;
