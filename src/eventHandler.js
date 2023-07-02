import { deleteTodo, updateTodo } from "./state.js";
import { todos, setTodos, addTodo } from "./state.js";
import { appendTodos, paintLocalTodos, paintLocalStatus } from "./paint.js";
import { sortTodos } from "./utils.js";

export function handleDelete(e) {
  const todoItem = e.currentTarget.parentElement;
  deleteTodo(todoItem.dataset.id);
  todoItem.remove();
}

export function handleStatus(e) {
  const todoItem = e.currentTarget.parentElement;
  const checkbox = e.currentTarget;
  const isDone = updateTodo(todoItem.dataset.id);
  if (isDone) {
    todoItem.classList.add("checked");
    checkbox.textContent = "✔";
  } else {
    todoItem.classList.remove("checked");
    checkbox.textContent = "";
  }
  paintLocalStatus();
}

export function attachEvent() {
  const $delBtn = document.querySelectorAll(".del-btn");
  $delBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
  const $checkBox = document.querySelectorAll(".checkbox");
  $checkBox.forEach((check) => check.addEventListener("click", handleStatus));
}

export function inputEvent() {
  const $input = document.querySelector(".todo-input");

  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const todo = addTodo(e.currentTarget.value);
      appendTodos(todo);
      paintLocalStatus();
      e.target.value = "";
    }
  });
}

export function clearAllEvent() {
  const $clearAllBtn = document.querySelector(".clear-all-btn");
  $clearAllBtn.addEventListener("click", () => {
    const { leftTodos, doneTodos } = sortTodos(todos);
    if (doneTodos.length === 0) {
      alert("삭제할 todo가 없습니다");
      return;
    }
    setTodos(leftTodos);
    paintLocalTodos(todos);
    paintLocalStatus();
  });
}

export function btnGroupEvent() {
  const $btnGroup = document.querySelector(".btn-group");
  $btnGroup.addEventListener("click", (e) => {
    const status = e.target.className.split(" ")[1];
    const clicked = $btnGroup.querySelector(".clicked");
    clicked?.classList.remove("clicked");
    e.target.classList.add("clicked");
    const { leftTodos, doneTodos } = sortTodos(todos);
    const filtered = {
      all: todos,
      active: leftTodos,
      done: doneTodos,
    };
    paintLocalTodos(filtered[status]);
  });
}
