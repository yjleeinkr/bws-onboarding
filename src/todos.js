import { getLocal, setLocal } from "./utils.js";
import { paintLocalTodos, appendTodos, paintLocalStatus } from "./paint.js";

let todos = getLocal("todos") ?? [];

function setTodos(newTodos) {
  todos = newTodos;
  setLocal("todos", todos);
  paintLocalStatus(todos);
}

function addTodo(text) {
  const id = `${new Date().getTime()}`;
  const todo = {
    id,
    text,
    isDone: false,
  };
  const newTodos = [...todos, todo];
  setTodos(newTodos);
  appendTodos(todo);
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

function initPaint() {
  paintLocalTodos(todos);
  paintLocalStatus(todos);
}

function initEvent() {
  const $input = document.querySelector(".todo-input");
  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(e.currentTarget.value);
      $input.value = "";
    }
  });
}

function init() {
  initPaint();
  initEvent();
}

init();
