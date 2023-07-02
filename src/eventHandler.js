import { deleteTodo, updateTodo } from "./todos.js";

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
}

export function attachEvent() {
  const $delBtn = document.querySelectorAll(".del-btn");
  $delBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
  const $checkBox = document.querySelectorAll(".checkbox");
  $checkBox.forEach((check) => check.addEventListener("click", handleStatus));
}
