import p5 from 'p5';
import './style.css';

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
    p.fill(0);
    p.stroke(255);
    p.strokeWeight(2);
  };

  p.draw = () => {
    p.background(0);
    p.square(p.width * 0.5 - 50, p.height * 0.5 - 50, 100);
  };
});
