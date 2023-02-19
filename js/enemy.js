import { BaseClass } from "./base.js";

const w = container.offsetWidth;

export class Enemy extends BaseClass {
  constructor(x, y, className, duration, hp) {
    const _x = Math.max(0, Math.min(x, w));

    super(_x, y, 'enemy ' + className);

    this.timer = null;
    this.count = 0;
    this.duration = duration;
    this.hp = hp;

    this.translateY()
  }

  // move() {
  //   let elTop = this.y;
  //   elTop -= 10;

  //   this.el.style.top = elTop + 'px';
  //   this.y = elTop;
  // }

  translateY() {
    const self = this;

    self.timer = setInterval(() => {
      self.count+=2;

      this.el.style.top = self.count + 'px';

      if (self.count > container.offsetHeight) {
        this.destroyed();
      }
    }, self.duration)
  }

  boom() {
    clearInterval(this.timer);
    this.el.classList.add('boom');

    console.log(this.el)

    setTimeout(() => {
      this.el.remove();
    }, 1500);
  }

  destroyed() {
    this.timer = null;
    this.el.remove();
  }
}