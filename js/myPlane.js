import { BaseClass } from "./base.js";

class MyPlane extends BaseClass {
  constructor() {
    super('', '', 'myPlane');

    this.bindEvent();
  }

  bindEvent() {
    this.el.ontouchstart = this.touchstart;
    this.el.ontouchend = this.touchmove;
  }

  touchstart(e) {
    e.preventDefault()
    container.ontouchmove = touchmove;
  }

  touchmove() {
    container.ontouchmove = null
  }
}

function touchmove(e) {
  const x = Math.max(0, Math.min(e.touches[0].clientX, container.offsetWidth))
  const y = Math.max(0, Math.min(e.touches[0].clientY, container.offsetHeight))
  e.target.style.top = y + 'px';
  e.target.style.left = x + 'px';
}

export function plane() {
  new MyPlane();
}