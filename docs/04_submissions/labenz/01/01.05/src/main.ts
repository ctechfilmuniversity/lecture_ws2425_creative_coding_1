// main.ts
import p5 from 'p5';
import './style.css';
import { TILES } from './types';
import { WaveFunctionCollapse } from './WaveFunctionCollapse';

let wfc: WaveFunctionCollapse;
const tileImages: Record<number, p5.Image> = {};

new p5((p: p5) => {
  p.preload = () => {
    tileImages[TILES.EMPTY] = p.loadImage('empty.png');
    tileImages[TILES.ARM_BOTTOM_LEFT] = p.loadImage('arm_bottom-left.png');
    tileImages[TILES.ARM_HORIZONTAL] = p.loadImage('arm_horizontal.png');
    tileImages[TILES.ARM_RIGHT_BOTTOM] = p.loadImage('arm_right-bottom.png');
    tileImages[TILES.ARM_RIGHT_TOP] = p.loadImage('arm_right-top.png');
    tileImages[TILES.ARM_TOP_LEFT] = p.loadImage('arm_top-left.png');
    tileImages[TILES.ARM_VERTICAL] = p.loadImage('arm_vertical.png');
    tileImages[TILES.CORPUSE] = p.loadImage('corpuse.png');
    tileImages[TILES.HEAD_BOTTOM_LEFT] = p.loadImage('head_bottom_left.png');
    tileImages[TILES.HEAD_BOTTOM_RIGHT] = p.loadImage('head_bottom_right.png');
    tileImages[TILES.HEAD_LEFT_TOP] = p.loadImage('head_left-top.png');
    tileImages[TILES.HEAD_RIGHT_TOP] = p.loadImage('head_right-top.png');
    tileImages[TILES.NECK_LEFT] = p.loadImage('neck_left.png');
    tileImages[TILES.NECK_RIGHT] = p.loadImage('neck_right.png');
  };

  p.setup = () => {
    p.createCanvas(384, 384);
    wfc = new WaveFunctionCollapse(p, 12, 12, tileImages);
    wfc.generate();
  };

  p.draw = () => {
    p.background(220);
    wfc.draw();
  };

  p.mousePressed = () => {
    wfc = new WaveFunctionCollapse(p, 12, 12, tileImages);
    wfc.generate();
  };
});
