declare var ml5: any; // using CDN package from index.html

interface ClassResult {
  label: string;
  confidence: number;
}

export default class ClapDec {
  private threshold: number;
  private coolDownMs: number;
  private model: any;
  private ready: boolean = false;
  private onClap: () => void;
  private onLoad: () => void;

  constructor(
    modelUrl: string,
    threshold: number = 0.8,
    coolDownMs: number = 800,
    onLoad?: () => void,
    onClap?: () => void,
  ) {
    this.onLoad = onLoad || (() => {});
    this.onClap = onClap || (() => {});
    this.threshold = threshold;
    this.coolDownMs = coolDownMs;
    this.model = ml5.soundClassifier(modelUrl + '/model.json');
    this.model.classifyStart(this.gotResult.bind(this)).then(() => {
      console.log('model loaded');
      this.ready = true;
      this.onLoad();
    });
  }

  public setOnClap(onClap: () => void) {
    this.onClap = onClap;
  }

  private gotResult(results: ClassResult[]) {
    if (!this.ready) return;
    const candidate = results[0];
    if (candidate.label === 'Clap' && candidate.confidence > this.threshold) {
      console.log('Clap detected');
      this.coolDown();
      this.onClap();
    }
  }

  private coolDown() {
    this.ready = false;
    setTimeout(() => {
      this.ready = true;
      console.log('ready');
    }, this.coolDownMs);
  }
}
