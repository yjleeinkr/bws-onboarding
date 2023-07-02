import { deleteTodo } from "./todos.js";

export function paintLocalTodos(todos) {
  return todos
    .map(
      (todo) => `
      <li class="todo-item ${todo.isDone ? "checked" : ""}" data-id=${todo.id}>
        <span class="checkbox"></span>
        <p class="todo-text">${todo.text}</p>
        <button class="del-btn">✕</button>
      </li>
      `
    )
    .join("");
}

export function handleDelete(e) {
  const todoItem = e.currentTarget.parentElement;
  deleteTodo(todoItem.dataset.id);
  todoItem.remove();
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

  todoItem.appendChild(checkBox);
  todoItem.appendChild(text);
  todoItem.appendChild(delBtn);
  list.appendChild(todoItem);
}
