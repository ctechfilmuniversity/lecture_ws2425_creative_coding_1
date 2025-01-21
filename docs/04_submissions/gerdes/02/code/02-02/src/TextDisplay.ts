import p5 from 'p5';

declare interface LyricsData {
  title: string;
  artist: string;
  album: string;
  year: string;
  lyrics: LyricsSegment[];
}

declare interface LyricsSegment {
  id: number;
  type: 'part' | 'hook' | 'loading';
  text: string;
}

export default class TextDisplay {
  private data: LyricsData | undefined = undefined;
  private textColor: p5.Vector;
  private bgColor: p5.Vector;
  private current: LyricsSegment;
  private index: number;
  private p: p5;

  constructor(instance: p5, dataURL: string) {
    this.p = instance;
    this.loadLyrics(dataURL);

    this.index = 0;
    this.current = { id: 0, type: 'loading', text: 'Loading...' };
    this.textColor = this.p.createVector(this.p.random(0, 360), 60, 70);
    this.bgColor = this.p.createVector(this.textColor.x + 180, 100, 70);

    this.p.colorMode(this.p.HSL);
  }

  public start() {
    this.updateCurrent();
  }

  public draw() {
    this.p.background(this.getColor(this.bgColor));
    this.p.fill(this.getColor(this.textColor));
    this.p.colorMode(this.p.HSB);
    this.p.textAlign(this.p.CENTER);
    this.p.noStroke();
    this.p.textSize(this.p.width / 10);
    this.p.text(this.current?.text, this.p.width / 2, this.p.height / 2);
  }

  public next() {
    if (!this.data) {
      return;
    }
    this.index = (this.index + 1) % this.data.lyrics.length;
    this.updateCurrent();
    this.updateColors();
  }

  private async loadLyrics(url: string) {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
      });
  }

  private updateCurrent() {
    if (!this.data) {
      return;
    }
    this.current = this.data.lyrics[this.index];
  }

  private updateColors() {
    const shift = this.p.random(10, 20);
    const hueText = this.p.abs((this.textColor.x + shift) % 360);
    const hueBg = this.p.abs((this.bgColor.x + shift) % 360);
    this.textColor = this.p.createVector(hueText, 60, 70);
    this.bgColor = this.p.createVector(hueBg, 100, 70);
  }

  private getColor(vector: p5.Vector) {
    return this.p.color(vector.x, vector.y, vector.z);
  }
}
