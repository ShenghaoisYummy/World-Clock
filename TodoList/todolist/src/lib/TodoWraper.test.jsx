/* eslint-disable testing-library/no-node-access */
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { TodoWraper }  from '../components/TodoWraper.js';

test('adds a new todo', () => {

  render(<TodoWraper />);
  
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

  const inputElement = screen.getByPlaceholderText(/what is the task today?/i);
  const addButton = screen.getByText(/Add Task/i);

  // Simulate adding a new todo
  fireEvent.change(inputElement, { target: { value: 'New Todo Task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Todo Task')).toBeInTheDocument();


  const deleteButton = document.querySelector('[data-icon="trash"]');;

  // Delete this to do
  fireEvent.click(deleteButton);
  expect(screen.queryByText('New Todo Task')).not.toBeInTheDocument();

});

test('edit a todo', () => {



});

test('toggleComplete a todo', () => {

  

});