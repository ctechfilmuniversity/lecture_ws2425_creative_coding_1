import p5 from 'p5';

export default class Grabable {
  private p: p5;
  public x: number;
  public y: number;
  public size: number;
  public grabbed: boolean = false;
  public done: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private target: p5.Vector;

  constructor(p: p5, x: number, y: number, size: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.size = size;
    this.target = new p5.Vector(x + 100, y + 50);
  }

  draw(): void {
    this.p.push();
    this.p.rectMode(this.p.CORNER);
    if (this.grabbed) {
      this.p.fill(200, 100, 100);
    } else {
      this.p.fill(100, 200, 100);
    }
    this.p.noStroke();
    this.p.rect(this.x, this.y, this.size, this.size);
    this.p.pop();

    this.p.push();
    this.p.noFill();
    this.p.stroke(255);
    this.p.strokeWeight(2);
    this.p.rect(this.target.x, this.target.y, this.size, this.size);
    this.p.pop();

    if (
      Math.abs(this.x - this.target.x) < 20 &&
      Math.abs(this.y - this.target.y) < 5
    ) {
      this.done = true;
    }
  }

  contains(mx: number, my: number): boolean {
    return (
      mx >= this.x &&
      mx <= this.x + this.size &&
      my >= this.y &&
      my <= this.y + this.size
    );
  }

  startGrab(pos: p5.Vector): void {
    if (this.contains(pos.x, pos.y)) {
      this.grabbed = true;
      this.offsetX = pos.x - this.x;
      this.offsetY = pos.y - this.y;
    }
  }

  drag(pos: p5.Vector): void {
    if (this.grabbed) {
      this.x = pos.x - this.offsetX;
      this.y = pos.y - this.offsetY;
    }
  }

  endGrab(): void {
    this.grabbed = false;
  }
}
