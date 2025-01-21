import p5 from 'p5';
import './style.css';

import TextDisplay from './TextDisplay';
import ClapDec from './ClapDec';

new p5((p: p5) => {
  let display: TextDisplay;
  let classifier: ClapDec;

  p.setup = () => {
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);

    display = new TextDisplay(p, './lyrics.json');
    classifier = new ClapDec(
      './clap-model',
      0.9,
      600,
      display.start.bind(display),
      display.next.bind(display),
    );
  };

  p.draw = () => {
    display.draw();
  };

  // p.keyPressed = () => {
  //   if (p.key === ' ') {
  //     display.next();
  //   }
  // };
});
