import p5 from 'p5';

export default class Greeting {
  constructor(
    private p: p5,
    private text: string = 'Hello World',
    private position: p5.Vector,
    private size: number = 50,
    private font?: p5.Font,
    private color?: p5.Color,
  ) {}

  public draw = () => {
    this.p.textAlign('left', 'top');
    this.p.textSize(this.size);
    if (this.font) this.p.textFont(this.font);
    if (this.color) {
      this.p.fill(this.color);
    } else {
      this.p.fill(255);
    }
    this.p.text(this.text, this.position.x, this.position.y);
  };
}
