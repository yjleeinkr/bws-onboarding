import Component from "../../core/Component.js";

export default class TodoInput extends Component {
  createTemplate() {
    return `<input type="text" placeholder="What needs to be done?"/>`;
  }
}
