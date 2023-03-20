# Todo List App
Create and manage a Todo List Application.

## Phase 1 Requirements: Lab 31
In Phase 1, we’re going to perform some refactoring of a Todo application built by another team. This application mixes application state and user settings at the top level and passes things around. It was a good proof of concept, but we need to make this production ready.

1. Implement the React context API for defining settings across the entire application.
    - Create React Context for managing application display settings and provide this at the application level.
    - Add the following defaults to the context provider’s state, they will not be changeable in this lab.
        - Display three items.
        - Hide completed items using a boolean.
        - Define “difficulty” as a default sort word to optionally use in the stretch goal.


2. Consume and utilize context values throughout your components.
    - Show a maximum of three items per screen by default in the `<List />` component.
    - Use the Mantine `<Pagination />` component to allow users to navigate a list of items.
    - Hide completed items in the list by default (the ability to show will be added in a later lab).

## UML 
![Todo UML](TODOUML.png)