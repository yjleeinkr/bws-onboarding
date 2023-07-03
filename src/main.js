import { paintLocalTodos, paintLocalStatus } from "./paint.js";
import { inputEvent, clearAllEvent, btnGroupEvent } from "./eventHandler.js";
import { getTodos } from "./state.js";

function initPaint() {
  paintLocalTodos(getTodos());
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
