import bgAnima from './background.js';
import { Enemy } from './enemy.js';
import { MyPlane } from './myPlane.js';
import { Bullet } from './bullet.js';

const playBtn = document.querySelector('.btn-play');
const reStart = document.querySelector('.btn-reStart');
const resetBtn = document.querySelector('.btn-reset');
let myPlane;
var timer = null, fjTimer = null;

let score = 0;

playBtn.onclick = playGame;
reStart.onclick = onReStart;
resetBtn.onclick = onReset;

function onReset() {
  window.location.reload();
}

function onReStart() {
  gameOver.style.display = 'none';
  battlefield.innerHTML = '';
  playGame()
}

function playGame() {
  scoreDom.style.display = 'block';
  hello.style.display = 'none';
  battlefield.style.display = 'block';

  // plane();
  myPlane = new MyPlane();

  timer = setInterval(timerAction, 20);
  // timerAction()
  playSound('../audio/bgm.mp3', true);
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
    const enemy = new Enemy(Math.random() * w - 48, -100, 'small', 20, 1, 1);
    pool.enemys.push(enemy);
  } else if (mark % 51 == 0) {
    const enemy = new Enemy(Math.random() * w - 96, -100, 'big', 40, 5, 3);
    pool.enemys.push(enemy);
  }
  //  else if (mark % 249 == 0) {
  //   const enemy = new Enemy(Math.random() * w - 192, -100, 'boss', 100, 10, 5);
  //   pool.enemys.push(enemy);
  // }

  if (mark % 5 === 0) {
    const bullet = new Bullet(myPlane.el.offsetLeft, myPlane.el.offsetTop);
    pool.bullets.push(bullet);
    playSound('../audio/bullet.mp3');

  }

  pool.bullets.forEach((item, index) => {
    if (item.el.offsetTop < h) {
      item.move();
    } else {
      item.el.remove();
      pool.bullets.splice(index, 1)
    }
  })

  pool.enemys.forEach((item, index) => {
    if (item.el.offsetTop < h) {
      item.move();
    } else {
      item.el.remove();
      pool.enemys.splice(index, 1)
    }
  })

  caculator();

  // timer = requestAnimationFrame(timerAction);
}

function playSound(url, loop = false){    
  let mp3 = new Audio(url) // 创建音频对象
  console.log(mp3.currentTime)
  mp3.loop = loop
  mp3.play() // 播放

  mp3.addEventListener('ended', function () {
    console.log(url + "播放结束");
  }, false);
}

function onGameOver() {
  clearInterval(timer);
  myPlane.boom();
  myPlane.el.ontouchstart = null;
  container.ontouchmove = null;
  gameOver.style.display = 'block';
}

function caculator() {
  pool.enemys.forEach((enemy, index) => {
    const [eTop, eLeft, eRight, eBottom] = [
      enemy.el.offsetTop,
      enemy.el.offsetLeft,
      enemy.el.offsetLeft + enemy.el.offsetWidth,
      enemy.el.offsetTop + enemy.el.offsetHeight
    ]
    
    const [planeLeft, planeTop, planeRight, planeBottom] = [
      myPlane.el.offsetLef,
      myPlane.el.offsetTop,
      myPlane.el.offsetLeft + myPlane.el.offsetWidth,
      myPlane.el.offsetTop + myPlane.el.offsetHeight
    ]
    let level = (planeRight >= eLeft) && (planeLeft <= eRight);
    let vertical = (planeTop < eBottom) && (planeBottom > eTop);

    if (enemy.y < h) {
      if (level && vertical) {
        onGameOver();
      }
    } else {
      enemy.el.remove();
      pool.enemys.splice(index, 1);
    }

    pool.bullets.forEach((bullet, i) => {
      const [top, left, right, bottom] = [
        bullet.el.offsetTop,
        bullet.el.offsetLeft,
        bullet.el.offsetLeft +  bullet.el.offsetWidth,
        bullet.el.offsetTop +  bullet.el.offsetHeight,
      ]
      
      const level = right >= eLeft && left <=  eRight;
      const vertical = top < eBottom && bottom > eTop;

      if (bullet.y > 0) {
        if (level && vertical) {
          bullet.el.remove();
  
          if (enemy.hp > 1) {
            enemy.hp-=1;
          } else {
            score += enemy.score;
            scoreEl.innerText = score
            enemy.boom();
            enemy.planIsBoom = true;
            pool.enemys.splice(index, 1);
            pool.bullets.splice(i, 1);
            playSound('../audio/boom.mp3');
          }
        }
      } else {
        bullet.el.remove();
        pool.bullets.splice(i, 1);
      }

    })

  })
}