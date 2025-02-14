import p5 from 'p5';

export default class Present {
  private color: p5.Color;
  private activeColor: p5.Color;
  private p: p5;
  private pos: p5.Vector;
  private target: p5.Vector;
  private offset: p5.Vector = new p5.Vector(0, 0);
  public size: number;
  public grabbed: boolean = false;
  public done: boolean = false;

  constructor(
    p: p5,
    pos: p5.Vector,
    target: p5.Vector,
    color: p5.Color,
    size: number = 50,
  ) {
    this.p = p;
    this.pos = pos;
    this.target = target;
    this.size = size;
    this.color = color;
    const white = this.p.color(255);
    this.activeColor = this.p.lerpColor(this.color, white, 0.5);
  }

  draw(): void {
    this.p.push();
    this.p.rectMode(this.p.CORNER);
    if (this.grabbed) {
      this.p.fill(this.activeColor);
    } else {
      this.p.fill(this.color);
    }
    this.p.noStroke();
    this.p.rect(this.pos.x, this.pos.y, this.size, this.size);
    this.p.pop();

    this.p.push();
    this.p.noFill();
    this.p.stroke(this.color);
    this.p.strokeWeight(2);
    this.p.rect(this.target.x, this.target.y, this.size, this.size);
    this.p.pop();

    if (
      Math.abs(this.pos.x - this.target.x) < 20 &&
      Math.abs(this.pos.y - this.target.y) < 5
    ) {
      this.done = true;
    }
  }

  contains(pos: p5.Vector): boolean {
    return (
      pos.x >= this.pos.x &&
      pos.x <= this.pos.x + this.size &&
      pos.y >= this.pos.y &&
      pos.y <= this.pos.y + this.size
    );
  }

  startGrab(pos: p5.Vector): void {
    if (this.contains(pos)) {
      this.grabbed = true;
      this.offset = pos.copy().sub(this.pos);
    }
  }

  drag(pos: p5.Vector): void {
    if (this.grabbed) {
      this.pos.set(pos.copy().sub(this.offset));
    }
  }

  endGrab(): void {
    this.grabbed = false;
  }
}
