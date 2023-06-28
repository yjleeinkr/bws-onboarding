// state, setState, render 를 가진 코어 컴포넌트
export default class Component {
  $targetEl;
  state;
  constructor($target) {
    this.$targetEl = $target;
    this.initiate();
    this.render();
  }
  initiate() {}
  createTemplate() {
    return "";
  }
  render() {
    this.$targetEl.innerHTML = this.createTemplate();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
