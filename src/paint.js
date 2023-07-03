import {
  handleDelete,
  handleStatus,
  attachEvent,
  changeEditMode,
} from "./eventHandler.js";
import { getTodos } from "./state.js";

export function paintLocalTodos(todoList) {
  const $todoList = document.querySelector(".todo-list");
  const template = todoList
    .map(
      (todo) => `
      <li class="todo-item ${todo.isDone ? "checked" : ""}" data-id=${todo.id}>
        <span class="checkbox">${todo.isDone ? "✔" : ""}</span>
        <p class="todo-text">${todo.text}</p>
        <button class="del-btn">✕</button>
      </li>
      `
    )
    .join("");
  $todoList.innerHTML = template;
  attachEvent();
}

export function paintLocalStatus() {
  const $balance = document.querySelector(".left-num");
  const balanceQty = getTodos().reduce((acc, todo) => {
    !todo.isDone && (acc += 1);
    return acc;
  }, 0);
  $balance.textContent = balanceQty;
}

function createElement(element, styleClass) {
  const el = document.createElement(element);
  el.classList.add(styleClass);
  return el;
}

export function appendTodos(todo) {
  const list = document.querySelector(".todo-list");
  const todoItem = createElement("li", "todo-item");
  const checkBox = createElement("span", "checkbox");
  const text = createElement("p", "todo-text");
  const delBtn = createElement("button", "del-btn");

  todoItem.setAttribute("data-id", todo.id);
  text.textContent = todo.text;
  delBtn.textContent = "✕";

  delBtn.addEventListener("click", handleDelete);
  checkBox.addEventListener("click", handleStatus);
  todoItem.addEventListener("dblclick", changeEditMode);

  todoItem.appendChild(checkBox);
  todoItem.appendChild(text);
  todoItem.appendChild(delBtn);
  list.appendChild(todoItem);
}
