import p5 from 'p5';

/**
 * A class representing a Circloid shape.
 */
export class Circloid {
  private p: p5;
  private margin: number;
  private maxInitialPos: number;
  private maxPosTotal: number;
  private shape: p5.Vector[];
  public center: p5.Vector;
  public radius: number;

  constructor(
    instance: p5,
    margin: number = 0,
    maxInitialPos: number = 12,
    maxPosTotal: number = 256,
  ) {
    this.p = instance;
    this.margin = margin;
    this.maxInitialPos = maxInitialPos;
    this.maxPosTotal = maxPosTotal;
    this.shape = this.initPolygon();
    this.center = this.getCenter();
    this.radius = this.getRadius();
  }

  /**
   * Draws the Circloid shape.
   */
  public draw(p: p5 = this.p): void {
    p.beginShape();
    this.shape.forEach((v) => {
      p.vertex(v.x, v.y);
    });
    p.endShape(p.CLOSE);
  }

  /**
   * Generates a Circloid shape with random coordinates.
   */
  private initPolygon(): p5.Vector[] {
    let shape: p5.Vector[] = [];
    for (let i = 0; i < this.p.random(3, this.maxInitialPos); i++) {
      shape.push(
        this.p.createVector(
          this.p.random(this.margin, this.p.width - this.margin),
          this.p.random(this.margin, this.p.height - this.margin),
        ),
      );
    }
    return shape;
  }

  /**
   * Subdivides the Circloid shape by adding a new vertex between two random existing vertices.
   */
  public subdivide(): void {
    if (this.shape.length >= this.maxPosTotal) {
      return;
    }
    let index = this.p.floor(this.p.random(this.shape.length));
    let next = (index + 1) % this.shape.length;
    let newVertex = p5.Vector.lerp(this.shape[index], this.shape[next], 0.5);
    this.shape.splice(index, 0, newVertex);
  }

  /**
   * Morphs the Circloid shape into (or away from) a circle.
   */
  public morph(strength = 0.05) {
    for (let i = 0; i < this.shape.length; i++) {
      let initalPos = this.shape[i];

      let angle = this.p.map(i, 0, this.shape.length, 0, this.p.TWO_PI);
      let targetX = this.center.x + this.p.cos(angle) * this.radius;
      let targetY = this.center.y + this.p.sin(angle) * this.radius;
      let target = this.p.createVector(targetX, targetY);

      let force = target.sub(initalPos);
      force.mult(strength);

      initalPos.add(force);
    }
  }

  /**
   * Computes the center of the Circloid by averaging its vertices.
   */
  private getCenter(): p5.Vector {
    let center = this.p.createVector(0, 0);
    for (let p of this.shape) {
      center.add(p);
    }
    center.div(this.shape.length);
    return center;
  }

  /**
   * Computes the radius of the Circloid by averaging the distances to the center.
   */
  private getRadius(): number {
    let radius = 0;
    for (let p of this.shape) {
      radius += p5.Vector.dist(this.getCenter(), p);
    }
    radius /= this.shape.length;
    return radius;
  }
}
