import p5 from 'p5';
import './style.css';
declare var ml5: any; // using CDN package from index.html

new p5((p: p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  };

  p.draw = () => {};

  window.addEventListener('resize', () => {
    p.resizeCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  });
});
