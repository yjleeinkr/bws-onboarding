import { getLocal, setLocal } from "./utils.js";
import { paintLocalTodos, appendTodos, handleDelete } from "./paint.js";

const $input = document.querySelector(".todo-input");
const $todoList = document.querySelector(".todo-list");

let todos = getLocal("todos") ?? [];

function setTodos(newTodos) {
  todos = newTodos;
  setLocal("todos", todos);
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

function initPaint() {
  const localTodos = paintLocalTodos(todos);
  $todoList.innerHTML = localTodos;
  const $delBtn = document.querySelectorAll(".del-btn");
  $delBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
}

function init() {
  initPaint();
  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(e.currentTarget.value);
      $input.value = "";
    }
  });
}

init();
