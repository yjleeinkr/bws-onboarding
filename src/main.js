import { paintLocalTodos, paintLocalStatus } from "./paint.js";
import { inputEvent, clearAllEvent, btnGroupEvent } from "./eventHandler.js";
import { todos } from "./state.js";

function initPaint() {
  paintLocalTodos(todos);
  paintLocalStatus();
}

function initEvent() {
  inputEvent();
  clearAllEvent();
  btnGroupEvent();
}

function init() {
  initPaint();
  initEvent();
}

init();
