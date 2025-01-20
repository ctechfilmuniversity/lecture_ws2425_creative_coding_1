import p5 from 'p5';
import './style.css';

import { Circloid } from './Circloid';
import { MouseMeasurement } from './MouseMeasurement';

new p5((p: p5) => {
  let circloid: Circloid;
  let mm: MouseMeasurement;

  const padding = 100;
  const mutationThreshold = 0.1;

  p.setup = () => {
    // setup canvas
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
    p.strokeWeight(2);
    p.cursor(p.CROSS);

    // setup text
    p.textSize(24);
    p.textAlign(p.CENTER);

    // init custom objects
    circloid = new Circloid(p, padding, 24);
    mm = new MouseMeasurement(p);
  };

  p.draw = () => {
    p.background(0);
    shape();
    text();
  };

  function text() {
    p.noStroke();
    const alpha = p.map(p.millis(), 0, 5000, 255, 0);
    if (alpha < 0) return;
    p.fill(255, alpha);
    p.text('Clean this mess up!', p.width / 2, p.height / 2);
  }

  function shape() {
    p.noFill();
    p.stroke(124);
    circloid.draw();
  }

  p.mouseMoved = () => {
    mm.onMouseMoved();
    const horVariance = mm.horizontalDifference / circloid.radius;
    const vertVariance = mm.verticalDifference / circloid.radius;
    const variance = horVariance * vertVariance;
    if (mm.velocity < 0.5 * mutationThreshold) return;
    if (variance > mutationThreshold && mm.velocity > mutationThreshold) {
      circloid.subdivide();
      circloid.morph(0.008);
    } else {
      circloid.morph(-0.016);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  };
});
