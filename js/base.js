export class BaseClass {
  constructor(x, y, className) {
    this.x = x;
    this.y = y;
    this.className = className;

    this.el = null;

    this.render();
  }

  render() {
    this.el = document.createElement('div');
    this.el.className = this.className;

    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';

    battlefield.appendChild(this.el);
  }
}