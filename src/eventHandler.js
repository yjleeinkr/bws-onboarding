import {
  getTodos,
  setTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  updateTodoText,
  replaceTodo,
} from "./state.js";
import { appendTodos, paintLocalTodos, paintLocalStatus } from "./paint.js";
import { sortTodos, $all, $ } from "./utils.js";

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

export function changeEditMode(e) {
  const $todoText = e.target;
  const originalText = $todoText.textContent;
  const $editInput = document.createElement("input");
  $editInput.value = originalText;
  $editInput.classList.add("input-for-edit");
  $editInput.setAttribute("autofocus", "");

  $editInput.addEventListener("keypress", (inputE) => {
    if (inputE.key === "Enter") {
      $todoText.innerHTML = inputE.target.value;
      updateTodoText($todoText.parentElement.dataset.id, inputE.target.value);
      document.body.removeEventListener("click", handleOutside);
    }
  });
  $todoText.appendChild($editInput);

  const handleOutside = (bodyE) => {
    if (
      bodyE.target !== $todoText.parentElement &&
      bodyE.target !== $editInput &&
      bodyE.target !== $editInput
    ) {
      $todoText?.removeChild($editInput);
      document.body.removeEventListener("click", handleOutside);
    }
  };
  document.body.addEventListener("click", handleOutside);
}

function getDragAfterElement(dragArea, y) {
  const noDrag = [...dragArea.querySelectorAll(".draggable:not(.dragging)")];
  // 드래그하고 있는 요소 제외한 나머지 .draggable

  const afterElementInfo = noDrag.reduce(
    (closest, curChild) => {
      const nearChild = curChild.getBoundingClientRect();
      const offset = y - nearChild.top - nearChild.height / 2;
      if (offset < 0 && offset > closest.offset) {
        // 0 이하 && 음의 무한대 사이 조건
        return { offset, element: curChild };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );

  return afterElementInfo.element;
}

export function dragEvent() {
  const $draggables = $all(".draggable");
  const $dragArea = $(".todo-list");
  let draddingTodoId; // 드래그하고있던 투두 아이디
  let afterTodoId; // 위치를 양보해준 투두 아이디

  $draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      replaceTodo(draddingTodoId, afterTodoId);
    });
  });

  $dragArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement($dragArea, e.clientY);

    const dragging = $dragArea.querySelector(".dragging");
    $dragArea.insertBefore(dragging, afterElement);
    // 부모노드.insertBefore(새로운 자식노드, 기준자식노드) 특정 기준 자식노드 앞에 새로운 노드 삽입 가능
    draddingTodoId = dragging.dataset.id;
    afterTodoId = afterElement?.dataset.id ?? -1;
  });
}

export function attachEvent() {
  const $delBtn = $all(".del-btn");
  const $checkBox = $all(".checkbox");
  const $text = $all(".todo-item .todo-text");
  $delBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
  $checkBox.forEach((check) => check.addEventListener("click", handleStatus));
  $text.forEach((text) => text.addEventListener("dblclick", changeEditMode));
  dragEvent();
}

export function inputEvent() {
  const $input = $(".todo-input");
  $input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const todo = addTodo(e.currentTarget.value);
      appendTodos(todo);
      paintLocalStatus();
      e.target.value = "";
      const $todoItem = $all(".todo-item");
      const $lastTodo = $todoItem[$todoItem.length - 1];
      $lastTodo.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });
}

export function clearAllEvent() {
  const $clearAllBtn = $(".clear-all-btn");
  $clearAllBtn.addEventListener("click", () => {
    const { leftTodos, doneTodos } = sortTodos(getTodos());
    if (doneTodos.length === 0) {
      alert("삭제할 todo가 없습니다");
      return;
    }
    setTodos(leftTodos);
    paintLocalTodos(getTodos());
    paintLocalStatus();
  });
}

export function btnGroupEvent() {
  const $btnGroup = $(".btn-group");
  const $btns = $all(".filter-btn");
  $btns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const status = e.target.className.split(" ")[1];
      const clicked = $btnGroup.querySelector(".clicked");
      clicked?.classList.remove("clicked");
      e.target.classList.add("clicked");
      const { leftTodos, doneTodos } = sortTodos(getTodos());
      const filtered = {
        all: getTodos(),
        active: leftTodos,
        done: doneTodos,
      };
      paintLocalTodos(filtered[status]);
    })
  );
}
