import p5 from 'p5';
import './style.css';

import GestureMouse from './GestureMouse';
import Grabable from './Grabable';

new p5((p: p5) => {
  let curs: GestureMouse;
  let grabables: Grabable[] = [];
  let currentGrab: Grabable | null = null;

  p.preload = (): void => {};

  p.setup = (): void => {
    p.createCanvas(window.innerWidth - 200, window.innerHeight - 200);
    curs = new GestureMouse(p, onPinchStart, onPinchEnd, onDrag);
    grabables.push(new Grabable(p, 100, 100, 50));
    grabables.push(new Grabable(p, 200, 150, 50));
    grabables.push(new Grabable(p, 300, 200, 50));
  };

  p.draw = (): void => {
    p.background(0);
    grabables.forEach((g) => {
      g.draw();
    });
    curs.draw();
  };

  const onPinchStart = () => {
    for (let i = grabables.length - 1; i >= 0; i--) {
      if (grabables[i].contains(curs.posCursor.x, curs.posCursor.y)) {
        currentGrab = grabables[i];
        grabables.splice(i, 1);
        grabables.push(currentGrab);
        currentGrab.startGrab(curs.posCursor);
        break;
      }
    }
  };

  const onPinchEnd = () => {
    if (currentGrab) {
      currentGrab.endGrab();
      currentGrab = null;
    }
    checkWin();
  };

  const onDrag = () => {
    if (currentGrab) {
      currentGrab.drag(curs.posCursor);
    }
  };

  const checkWin = () => {
    if (grabables.every((g) => g.done)) {
      console.log('yey');
    }
  };
});
