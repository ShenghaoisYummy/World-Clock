/* eslint-disable testing-library/no-node-access */
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { TodoWraper }  from '../components/TodoWraper.js';

test('adds a new todo', () => {

  render(<TodoWraper />);
  
  // get input element and addbutton
  const inputElement = screen.getByPlaceholderText(/what is the task today?/i);
  const addButton = screen.getByText(/Add Task/i);

  // Simulate adding a new todo
  fireEvent.change(inputElement, { target: { value: 'New Todo Task' } });
  fireEvent.click(addButton);


  // Assert that the new todo is in the document
  expect(screen.getByText('New Todo Task')).toBeInTheDocument();

});

test('delete a todo', () => {

  render(<TodoWraper />);

  // get input element and addbutton
  const inputElement = screen.getByPlaceholderText(/what is the task today?/i);
  const addButton = screen.getByText(/Add Task/i);

  // Simulate adding a new todo
  fireEvent.change(inputElement, { target: { value: 'New Todo Task' } });
  fireEvent.click(addButton);

  // Assert that the todo is initially present
  expect(screen.getByText('New Todo Task')).toBeInTheDocument();

  // Get delete button
  const deleteButton = document.querySelector('[data-icon="trash"]');

  // Delete this to do
  fireEvent.click(deleteButton);
  expect(screen.queryByText('New Todo Task')).not.toBeInTheDocument();

});

test('edit a todo', () => {

  render(<TodoWraper />);

// get input element and addbutton
  const inputElement = screen.getByPlaceholderText(/what is the task today?/i);
  const addButton = screen.getByText(/Add Task/i);

// Simulate adding a new todo
  fireEvent.change(inputElement, { target: { value: 'New Todo Task' } });
  fireEvent.click(addButton);

  // Assert that the todo is initially present
  expect(screen.getByText('New Todo Task')).toBeInTheDocument();

  // Edit the todo
  const editButton = document.querySelector('[data-icon="pen-to-square"]'); // Assuming your "Edit" button has text "Edit"
  fireEvent.click(editButton);

  // Find the input field in the EditTodoForm and change its value
  const editTodoInput = screen.getByPlaceholderText(/update here/i);
  fireEvent.change(editTodoInput, { target: { value: 'Edited Todo' } });

  // Save the edit
  const saveButton = screen.getByText(/Update Task/i); // Assuming your "Save" button has text "Save"
  fireEvent.click(saveButton);

  // Assert that the todo is edited
  expect(screen.queryByText(/New Todo Task/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Edited Todo/i)).toBeInTheDocument();



});

test('toggleComplete a todo', () => {

  render(<TodoWraper />);

  // get input element and addbutton
  const inputElement = screen.getByPlaceholderText(/what is the task today?/i);
  const addButton = screen.getByText(/Add Task/i);

  // Simulate adding a new todo
  fireEvent.change(inputElement, { target: { value: 'New Todo Task' } });
  fireEvent.click(addButton);

  // Assert that the todo is initially incomplete
  const incompleteTodo = screen.getByText(/New Todo Task/i);
  expect(incompleteTodo).toBeInTheDocument();
  expect(incompleteTodo).not.toHaveStyle('text-decoration: line-through');

  // Toggle complete status
  const toggleCompleteButton = screen.getByText(/New Todo Task/i);
  console.log(toggleCompleteButton);
  fireEvent.click(toggleCompleteButton);

  // Assert that the todo is now complete
  expect(incompleteTodo).not.toHaveStyle('text-decoration: line-through');

});