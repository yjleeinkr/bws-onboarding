export function paintLocalTodos(todos) {
  return todos
    .map(
      (todo) => `
      <li class="todo-item ${todo.isDone ? "checked" : ""}">
        <span class="checkbox"></span>
        <p class="todo-text">${todo.text}</p>
        <button class="del-btn">✕</button>
      </li>
      `
    )
    .join("");
}

function createElement(element, styleClass) {
  const el = document.createElement(element);
  el.classList.add(styleClass);
  return el;
}

export function appendTodos(content) {
  const list = document.querySelector(".todo-list");
  const todoItem = createElement("li", "todo-item");
  const checkBox = createElement("span", "checkbox");
  const text = createElement("p", "todo-text");
  const delBtn = createElement("button", "del-btn");

  text.textContent = content;
  delBtn.textContent = "✕";

  todoItem.appendChild(checkBox);
  todoItem.appendChild(text);
  todoItem.appendChild(delBtn);
  list.appendChild(todoItem);
}
