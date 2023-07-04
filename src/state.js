import { getLocal, setLocal } from "./utils.js";

let todos = getLocal("todos") ?? [];

export function getTodos() {
  return todos;
}

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

export function changeOrder(originalId, changedId) {
  const idx = todos.findIndex((todo) => todo.id === originalId);
  const changeIdx =
    changedId === -1
      ? todos.length
      : todos.findIndex((todo) => todo.id === changedId);

  let tmpTodos = todos;
  const dragItem = todos[idx];
  tmpTodos.splice(idx, 1);
  tmpTodos.splice(changeIdx - 1, 0, dragItem);
  setTodos(tmpTodos);
}
