import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('Add a new todo'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteBtn = screen.getByText('Build a Todo App').nextSibling;
    fireEvent.click(deleteBtn);
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
  });
});
