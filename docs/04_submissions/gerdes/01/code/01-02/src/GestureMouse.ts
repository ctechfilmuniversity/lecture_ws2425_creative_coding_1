import p5 from 'p5';
declare var ml5: any; // using CDN package from index.html

const handPoseConfig = {
  maxHands: 1,
  flipped: true,
  runtime: 'tfjs',
  modelType: 'full',
};

export default class GestureMouse {
  private p: p5;
  private handPose: any;
  private video: p5.Element;
  private hands: Array<any> = [];
  private connections: number[][] = [];

  private thresholdPinch: number;
  public pinched: boolean;
  private posIndex: p5.Vector;
  private posThumb: p5.Vector;
  public posCursor: p5.Vector;

  private activeCoolDown: number | undefined;
  private coolDownMs: number;
  private ready: boolean;

  private cbOnPinchStart?: () => void;
  private cbOnPinchEnd?: () => void;
  private cbOnDrag?: () => void;

  constructor(
    p: p5,
    onPinchStart?: () => void,
    onPinchEnd?: () => void,
    onDrag?: () => void,
    thresholdPinch: number = 50,
    coolDownMs: number = 100,
  ) {
    this.handPose = ml5.handPose(handPoseConfig, () => {
      console.log('ml5 model loaded');
    });

    this.p = p;

    this.video = this.p.createCapture('video', { flipped: true } as any);
    this.video.size(this.p.width, this.p.height);
    this.video.hide();

    this.handPose.detectStart(this.video.elt, this.gotHands);
    this.connections = this.handPose.getConnections();

    this.posIndex = this.p.createVector();
    this.posThumb = this.p.createVector();
    this.posCursor = this.p.createVector();

    this.activeCoolDown = undefined;
    this.coolDownMs = coolDownMs;
    this.ready = true;
    this.thresholdPinch = thresholdPinch;
    this.pinched = false;

    this.cbOnPinchStart = onPinchStart;
    this.cbOnPinchEnd = onPinchEnd;
    this.cbOnDrag = onDrag;
  }

  public draw = () => {
    this.updateInternals();

    this.p.stroke(255);
    this.p.noFill();
    this.p.strokeWeight(2);

    if (this.pinched) {
      this.cbOnDrag?.();
      this.p.circle(this.posCursor.x, this.posCursor.y, 20);
    } else {
      this.p.line(
        this.posIndex.x,
        this.posIndex.y,
        this.posThumb.x,
        this.posThumb.y,
      );
    }
  };

  private updateInternals = () => {
    const hand = this.hands[0];
    if (!hand) return;

    // ids are constant refer to ml5 docs if breaks -> https://docs.ml5js.org/#/reference/handpose?id=handposedetectstart
    this.posIndex.set(hand.keypoints[4].x, hand.keypoints[4].y);
    this.posThumb.set(hand.keypoints[8].x, hand.keypoints[8].y);

    const distance = this.posIndex.dist(this.posThumb);
    const mid = this.posIndex.copy().lerp(this.posThumb, 0.5);
    this.posCursor.set(mid);

    if (!this.ready) return;
    if (distance < this.thresholdPinch) {
      if (!this.pinched) this.cbOnPinchStart?.();
      this.pinched = true;
    } else {
      if (this.pinched) this.cbOnPinchEnd?.();
      this.pinched = false;
    }
    this.coolDown();
  };

  // the ml5 example for debugging
  public debugDraw = () => {
    this.p.image(this.video, 0, 0, this.p.width, this.p.height);

    // connections
    for (let i = 0; i < this.hands.length; i++) {
      const hand = this.hands[i];
      for (let j = 0; j < this.connections.length; j++) {
        const pointAIndex = this.connections[j][0];
        const pointBIndex = this.connections[j][1];
        const pointA = hand.keypoints[pointAIndex];
        const pointB = hand.keypoints[pointBIndex];
        this.p.stroke(255, 0, 0);
        this.p.strokeWeight(2);
        this.p.line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }

    // keypoints
    for (let i = 0; i < this.hands.length; i++) {
      const hand = this.hands[i];
      for (let j = 0; j < hand.keypoints.length; j++) {
        const keypoint = hand.keypoints[j];
        this.p.fill(0, 255, 0);
        this.p.noStroke();
        this.p.circle(keypoint.x, keypoint.y, 10);
      }
    }
  };

  private gotHands = (results: any[]): void => {
    this.hands = results;
  };

  private coolDown = () => {
    this.ready = false;
    if (this.activeCoolDown) return;
    this.activeCoolDown = setTimeout(() => {
      this.ready = true;
      this.activeCoolDown = undefined;
    }, this.coolDownMs);
  };
}
