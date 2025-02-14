import p5 from 'p5';
import './style.css';

import Greeting from './Greeting';
import GestureMouse from './GestureMouse';
import Present from './Present';

new p5((p: p5) => {
  let curs: GestureMouse;
  let presents: Present[] = [];
  let currentGrab: Present | null = null;

  let font: p5.Font;
  let greet: Greeting;
  let tree: p5.Image;

  let started = false;
  let done = false;

  p.preload = (): void => {
    font = p.loadFont('/Silkscreen/Silkscreen-Regular.ttf');
    tree = p.loadImage('/tree.png');
  };

  p.setup = (): void => {
    p.createCanvas(1000, 800);
    curs = new GestureMouse(p, onPinchStart, onPinchEnd, onDrag);
    // visual scene
    greet = new Greeting(
      p,
      'Happy\nHoliday\nand a\nSnowy\nWinter\nSeason!',
      p.createVector(100, 200),
      50,
      font,
    );
    presents.push(
      new Present(
        p,
        p.createVector(p.random(100, 200), p.random(200, 500)),
        p.createVector(p.random(450, 750), p.random(500, 600)),
        p.color('#917740'),
        p.random(50, 200),
      ),
    );
    presents.push(
      new Present(
        p,
        p.createVector(p.random(100, 200), p.random(200, 500)),
        p.createVector(p.random(450, 750), p.random(500, 600)),
        p.color('#326559'),
        p.random(100, 200),
      ),
    );
    presents.push(
      new Present(
        p,
        p.createVector(p.random(100, 200), p.random(200, 500)),
        p.createVector(p.random(450, 750), p.random(500, 600)),
        p.color('#a4403a'),
        p.random(150, 200),
      ),
    );
  };

  p.draw = (): void => {
    p.background('#142c28');
    greet.draw();
    p.image(tree, 600, 100, 275, 375);
    presents.forEach((g) => {
      g.draw();
    });
    curs.draw();
    // curs.debugDraw();
  };

  const onPinchStart = () => {
    for (let i = presents.length - 1; i >= 0; i--) {
      if (presents[i].contains(curs.posCursor)) {
        currentGrab = presents[i];
        presents.splice(i, 1);
        presents.push(currentGrab);
        currentGrab.startGrab(curs.posCursor);
        break;
      }
    }
  };

  const onPinchEnd = () => {
    if (currentGrab) {
      currentGrab.endGrab();
      currentGrab = null;
      if (!started) removeModal();
    }
    checkWin();
  };

  const onDrag = () => {
    if (currentGrab) {
      currentGrab.drag(curs.posCursor);
    }
  };

  // non-p5
  const checkWin = () => {
    if (presents.every((g) => g.done) && !done) {
      const snowEffect = document.createElement('snow-effect');
      snowEffect.setAttribute('color', 'white');
      snowEffect.setAttribute('flakes', '200');
      snowEffect.setAttribute('speed', '5');
      document.body.appendChild(snowEffect);
      done = true;
    }
  };

  const removeModal = () => {
    started = true;
    const modal = document.getElementById('tutorial');
    if (modal) {
      modal.classList.add('animate-out');
      modal.addEventListener('transitionend', () => modal.remove(), {
        once: true,
      });
    }
  };
});
