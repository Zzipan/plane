import { BaseClass } from "./base.js";

export class Bullet extends BaseClass {
    constructor(x, y) {
        super(x, y, 'bullet');
    }

    move() {
        let elTop = this.y;
        elTop -= 10;

        this.el.style.top = elTop + 'px';
        this.y = elTop;
    }
}