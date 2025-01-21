import p5 from 'p5';

export class MouseMeasurement {
  private p: p5;
  private buffer: p5.Vector[];
  private bufferSize: number;
  private maxVelocity: number;

  public velocity: number;
  public horizontalDifference: number;
  public verticalDifference: number;

  constructor(instance: p5, buffersize: number = 12, maxVelocity: number = 20) {
    this.p = instance;
    this.bufferSize = buffersize;
    this.maxVelocity = maxVelocity;
    this.buffer = [];

    this.velocity = 0;
    this.horizontalDifference = 0;
    this.verticalDifference = 0;
  }

  public onMouseMoved(): void {
    this.updateBuffer();
    this.updateVelocity();
    this.updateDifferences();
  }

  private updateBuffer(): void {
    if (this.buffer.length >= this.bufferSize) {
      this.buffer.shift();
    }
    this.buffer.push(
      this.p.createVector(this.p.mouseX, this.p.mouseY, this.p.millis()),
    );
  }

  private updateVelocity(): void {
    if (this.buffer.length < 2) {
      return;
    }
    const first = this.buffer[0];
    const second = this.buffer[1];
    const distance = this.p.dist(first.x, first.y, second.x, second.y);
    const time = second.z - first.z;
    this.velocity = this.normalize(distance / time, this.maxVelocity);
  }

  private updateDifferences(): void {
    if (this.buffer.length < 2) {
      return;
    }
    const first = this.buffer[0];
    const last = this.buffer[this.buffer.length - 1];
    this.horizontalDifference = this.p.abs(first.x - last.x);
    this.verticalDifference = this.p.abs(first.y - last.y);
  }

  private normalize(value: number, max: number): number {
    let result = this.p.map(value, 1, max, 0, 1);
    return this.p.min(this.p.max(result, 0), 1);
  }
}
