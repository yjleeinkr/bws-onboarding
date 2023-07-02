import { getLocal, setLocal } from "./utils.js";

export let todos = getLocal("todos") ?? [];

export function setTodos(newTodos) {
  todos = newTodos;
  setLocal("todos", todos);
}

export function addTodo(text) {
  const id = `${new Date().getTime()}`;
  const todo = {
    id,
    text,
    isDone: false,
  };
  const newTodos = [...todos, todo];
  setTodos(newTodos);
  return todo;
}

export function deleteTodo(id) {
  const newTodos = todos.filter((todo) => todo.id !== id);
  setTodos(newTodos);
}

export function updateTodo(id) {
  let clickedId;
  const updatedTodos = todos.map((todo, i) => {
    if (todo.id === id) {
      clickedId = i;
      return { ...todo, isDone: !todo.isDone };
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
  return todos[clickedId].isDone;
}

export function updateTodoText(id, text) {
  const updateTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, text } : todo
  );
  setTodos(updateTodos);
}
