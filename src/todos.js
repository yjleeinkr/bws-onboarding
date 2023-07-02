import { getLocal, setLocal } from "./utils.js";
import { paintLocalTodos, appendTodos, paintLocalStatus } from "./paint.js";
import { handleDelete, handleStatus } from "./eventHandler.js";

const $input = document.querySelector(".todo-input");
const $todoList = document.querySelector(".todo-list");

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
  const localTodos = paintLocalTodos(todos);
  $todoList.innerHTML = localTodos;
  paintLocalStatus(todos);
}

function initEvent() {
  const $delBtn = document.querySelectorAll(".del-btn");
  $delBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
  const $checkBox = document.querySelectorAll(".checkbox");
  $checkBox.forEach((check) => check.addEventListener("click", handleStatus));
}

function init() {
  initPaint();
  initEvent();
  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo(e.currentTarget.value);
      $input.value = "";
    }
  });
}

init();
