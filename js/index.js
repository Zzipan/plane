import bgAnima from './background.js';
import { Enemy } from './enemy.js';
import { plane } from './myPlane.js';
import { Bullet } from './bullet.js';

const playBtn = document.querySelector('.btn-play');
let myPlane;
let timer = null, fjTimer = null;

playBtn.onclick = playGame


function playGame() {
  document.querySelector('.wrap').style.display = 'none';

  plane();

  myPlane = document.querySelector('.myPlane');
  // timer = setInterval(timerAction, 20);
  timerAction()
}

let mark = 0;

const pool = {
  enemys: [],
  bullets: [],
}

const w = container.offsetWidth;
const h = container.offsetHeight;

function timerAction() {
  bgAnima();

  mark++;

  if (mark % 20 === 0) {
    const enemy = new Enemy(Math.random() * w - 48, -100, 'small', 20, 1);
    pool.enemys.push(enemy);
  } else if (mark % 51 == 0) {
    const enemy = new Enemy(Math.random() * w - 96, -100, 'big', 40, 5);
    pool.enemys.push(enemy);
  } else if (mark % 249 == 0) {
    const enemy = new Enemy(Math.random() * w - 192, -100, 'boss', 100, 10);
    pool.enemys.push(enemy);
  }

  if (mark % 5 === 0) {
    const bullet = new Bullet(myPlane.offsetLeft, myPlane.offsetTop);
    pool.bullets.push(bullet);
  }

  pool.bullets.forEach((item, index) => {
    if (item.el.offsetTop < h) {
      item.move();
    } else {
      item.el.remove();
      pool.bullets.splice(index, 1)
    }
  })

  caculator();

  requestAnimationFrame(timerAction);
}

function caculator() {
  pool.enemys.forEach((enemy, index) => {
    const [eTop, eLeft, eRight, eBottom] = [
      enemy.el.offsetTop,
      enemy.el.offsetLeft,
      enemy.el.offsetLeft + enemy.el.offsetWidth,
      enemy.el.offsetTop + enemy.el.offsetHeight
    ]

    pool.bullets.forEach((bullet, i) => {
      const [top, left, right, bottom] = [
        bullet.el.offsetTop,
        bullet.el.offsetLeft,
        bullet.el.offsetLeft +  bullet.el.offsetWidth,
        bullet.el.offsetTop +  bullet.el.offsetHeight,
      ]
      
      const level = right >= eLeft && left <=  eRight;
      const vertical = top < eBottom && bottom > eTop;

      if (level && vertical) {
        console.log('子弹与敌机顶部相撞', enemy.hp)
        bullet.el.remove();

        if (enemy.hp > 1) {
          enemy.hp-=1;
        } else {
          enemy.boom();
          pool.enemys.splice(index, 1);
          pool.bullets.splice(i, 1);
        }
      }
    })

  })
}