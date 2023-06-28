import Component from "../../core/Component.js";

export default class Todos extends Component {
  initiate() {
    this.state = { todos: ["item1"] };
  }
  createTemplate() {
    const { todos } = this.state;
    return `
      <ul>
        ${todos.map((todo) => `<li>${todo}</li>`).join("")}
      </ul>
    `;
  }
  setEvent() {}
}
