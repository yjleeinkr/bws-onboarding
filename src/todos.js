import { getLocal, setLocal } from "./utils.js";
import { paintLocalTodos, appendTodos } from "./paint.js";

const $input = document.querySelector(".todo-input");
const $todoList = document.querySelector(".todo-list");

let todos = getLocal("todos") ?? [];

function setTodos(newTodos) {
  todos = newTodos;
  setLocal("todos", todos);
}

function addTodos(text) {
  const id = new Date().getTime();
  const todo = {
    id,
    text,
    isDone: false,
  };
  const newTodos = [...todos, todo];
  setTodos(newTodos);
  appendTodos(text);
}

function initPaint() {
  const localTodos = paintLocalTodos(todos);
  $todoList.innerHTML = localTodos;
}

function init() {
  initPaint();
  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodos(e.currentTarget.value);
      $input.value = "";
    }
  });
}

init();
