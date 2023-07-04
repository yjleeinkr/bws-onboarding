export const stringify = (x) => JSON.stringify(x);
export const parse = (x) => JSON.parse(x);

export const setLocal = (key, value) => {
  localStorage.setItem(key, stringify(value));
};

export const getLocal = (key) => {
  return localStorage.getItem(key) ? parse(localStorage.getItem(key)) : [];
};

export const sortTodos = (todos) => {
  let leftTodos = [];
  let doneTodos = [];
  todos.forEach((todo) =>
    todo.isDone ? doneTodos.push(todo) : leftTodos.push(todo)
  );
  return { leftTodos, doneTodos };
};

export const $ = (element) => document.querySelector(element);
export const $all = (element) => document.querySelectorAll(element);
