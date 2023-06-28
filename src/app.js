import Todos from "./components/Todos.js";

export default class App {
  constructor() {
    const $app = document.querySelector("#app");
    new Todos($app);
  }
}
