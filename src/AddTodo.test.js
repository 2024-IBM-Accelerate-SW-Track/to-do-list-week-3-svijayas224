import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "taskOne" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  fireEvent.change(inputTask, { target: { value: "taskOne" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  const tasks = screen.getAllByText(/taskOne/i);
  expect(tasks.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  const tasks = screen.queryAllByRole('taskOne');
  expect(tasks.length).toBe(0);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Task/i });
  const addButton = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "taskTwo" } });
  fireEvent.click(addButton);
  const tasks = screen.queryAllByText(/taskTwo/i);
  expect(tasks.length).toBe(0);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Task/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/30/2023";
  fireEvent.change(inputTask, { target: { value: "taskThree" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const tasks = screen.queryAllByText(/taskThree/i);
  expect(tasks.length).toBe(0);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Task/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: 'Past Due' } });
  fireEvent.change(inputDate, { target: { value: '01/01/2023' } });
  fireEvent.click(addButton);
  const pastDueTask = screen.getByTestId('Past Due');
  expect(pastDueTask).toHaveStyle(`background-color: red`);
 });
