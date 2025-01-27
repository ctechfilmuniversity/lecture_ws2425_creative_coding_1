import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface Level {
  gltfUrl: string;
  startRotation: THREE.Euler;
  targetRotation: THREE.Euler[];
  backgroundImage: string;
}

class RotationPuzzle {
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera();
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private currentObject: THREE.Object3D | null = null;
  private debugElement: HTMLElement = document.getElementById('debug')!;
  private baseQuaternion: THREE.Quaternion = new THREE.Quaternion();
  private targetQuaternion: THREE.Quaternion = new THREE.Quaternion();
  private targetQuaternions: THREE.Quaternion[] = [];
  private isDragging: boolean = false;
  private startXY: { x: number; y: number } = { x: 0, y: 0 };
  private readonly rotationEaseFactor: number = 0.15;
  private isAnimating: boolean = false;
  private currentLevelIndex: number = 0;
  private readonly rotationThreshold: number = 0.2;
  private isInteravtive: boolean = true;
  private transitionDuration: number = 2000;

  private readonly levels: Level[] = [
    {
      gltfUrl: '/assets/lines_3.gltf',
      startRotation: new THREE.Euler(0, 0, 0),
      targetRotation: [
        new THREE.Euler(2.902, -0.528, -3.142),
        new THREE.Euler(-2.874, -0.52, -0.006),
        new THREE.Euler(-0.282, -0.466, 0.974),
      ],
      backgroundImage: '/assets/hint_3.svg',
    },
    {
      gltfUrl: '/assets/lines_4.gltf',
      startRotation: new THREE.Euler(0, 0, 0),
      targetRotation: [new THREE.Euler(-2.723, -0.115, 0.737)],
      backgroundImage: '/assets/hint_4.svg',
    },
    {
      gltfUrl: '/assets/lines_2.gltf',
      startRotation: new THREE.Euler(0, 0, 0),
      targetRotation: [
        new THREE.Euler(-2.018, 0.645, -1.877),
        new THREE.Euler(2.913, -0.018, -1.783),
        new THREE.Euler(-2.893, -0.047, -1.355),
        new THREE.Euler(2.104, -0.628, -1.314),
        new THREE.Euler(0.959, 0.109, -1.331),
        new THREE.Euler(-0.364, 0.583, -1.427),
        new THREE.Euler(2.92, 0.201, 1.922),
        new THREE.Euler(-0.335, -0.666, 1.362),
        new THREE.Euler(-0.956, -0.078, 1.842),
        new THREE.Euler(1.983, -0.572, 1.323),
      ],
      backgroundImage: '/assets/hint_2.svg',
    },
    {
      gltfUrl: '/assets/lines_1.gltf',
      startRotation: new THREE.Euler(0, 0, 0),
      targetRotation: [new THREE.Euler(2.485, 0.274, 1.651)],
      backgroundImage: '/assets/hint_1.svg',
    },
  ];

  constructor() {
    this.initScene();
    this.setupControls();
    this.loadLevel();
    this.animatedBackgroundIn();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const distance = 5;
    this.camera = new THREE.OrthographicCamera(
      -distance * aspect,
      distance * aspect,
      distance,
      -distance,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040));

    const debugEl = document.getElementById('debug');
    if (!debugEl) throw new Error('Debug element not found');
    this.debugElement = debugEl;
  }

  private animatedBackgroundIn() {
    const backgroundEl = document.getElementById('background');
    backgroundEl?.classList.add('fadeIn');

    backgroundEl?.addEventListener('animationend', () => {
      backgroundEl.classList.remove('fadeIn');
    });
  }

  private async loadLevel(): Promise<void> {
    if (!this.levels[this.currentLevelIndex]) return;

    const level = this.levels[this.currentLevelIndex];
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(level.gltfUrl);
      this.currentObject = gltf.scene;

      this.currentObject.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 1,
            roughness: 0,
            envMapIntensity: 1,
          });
        }
      });

      this.currentObject.scale.set(0, 0, 0);

      this.currentObject.rotation.copy(level.startRotation);
      this.targetQuaternion.copy(this.currentObject.quaternion);
      this.targetQuaternions = level.targetRotation.map((euler) =>
        new THREE.Quaternion().setFromEuler(euler)
      );

      this.scene.add(this.currentObject);

      const backgroundEl = document.getElementById(
        'background'
      ) as HTMLImageElement;
      if (backgroundEl) {
        backgroundEl.src = level.backgroundImage;
      }

      this.baseQuaternion.copy(this.currentObject.quaternion);

      animateScale(
        this.currentObject,
        0,
        4,
        this.transitionDuration / 2,
        easeOutCubic,
        () => {
          this.isInteravtive = true;
        }
      );
    } catch (error) {
      console.error('Error loading GLTF model:', error);
      throw error;
    }

    this.animate();
  }

  private setupControls(): void {
    document.addEventListener('mousedown', (e: MouseEvent) => {
      if (!this.isInteravtive) return;
      this.isDragging = true;
      this.startXY = { x: e.clientX, y: e.clientY };
      if (this.currentObject) {
        this.baseQuaternion.copy(this.currentObject.quaternion);
      }
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isInteravtive) return;
      if (!this.isDragging || !this.currentObject) return;

      const deltaX = (e.clientX - this.startXY.x) * 0.01;
      const deltaY = (e.clientY - this.startXY.y) * 0.01;

      const xRot = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        deltaY
      );
      const yRot = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        deltaX
      );

      this.targetQuaternion
        .copy(this.baseQuaternion)
        .premultiply(yRot)
        .premultiply(xRot);
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      if (this.currentObject) {
        this.baseQuaternion.copy(this.targetQuaternion);
      }
    });

    window.addEventListener('resize', () => {
      const aspect = window.innerWidth / window.innerHeight;
      const distance = 5;

      this.camera.left = -distance * aspect;
      this.camera.right = distance * aspect;
      this.camera.top = distance;
      this.camera.bottom = -distance;

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private checkVictory(): void {
    if (!this.currentObject || !this.isInteravtive || this.isAnimating) return;

    const isCorrect = this.targetQuaternions.some((targetQuat) => {
      return (
        this.currentObject!.quaternion.angleTo(targetQuat) <
        this.rotationThreshold
      );
    });

    if (isCorrect) {
      this.isAnimating = true;
      this.isInteravtive = false;

      if (this.currentObject) {
        this.showSolvedAnimation();
        animateScale(
          this.currentObject,
          4,
          0,
          this.transitionDuration / 2,
          easeInCubic,
          () => {
            this.scene.remove(this.currentObject!);

            this.currentLevelIndex++;

            if (this.currentLevelIndex < this.levels.length) {
              this.loadLevel();
            } else {
              alert('Game Completed!');
            }

            this.isAnimating = false;
          }
        );
      }
    }
  }
  private showSolvedAnimation(): void {
    const solvedEl = document.getElementById('solved');
    const backgroundEl = document.getElementById('background');

    solvedEl?.classList.add('animate');
    backgroundEl?.classList.add('animate');

    solvedEl?.addEventListener(
      'animationend',
      () => {
        solvedEl.classList.remove('animate');
      },
      { once: true }
    );

    backgroundEl?.addEventListener(
      'animationend',
      () => {
        backgroundEl.classList.remove('animate');
      },
      { once: true }
    );
  }

  private updateDebugInfo(): void {
    if (!this.currentObject) return;

    const euler = new THREE.Euler().setFromQuaternion(
      this.currentObject.quaternion,
      'XYZ'
    );
    this.debugElement.innerHTML = `
      Rotation<br>
      X: ${euler.x.toFixed(3)}<br>
      Y: ${euler.y.toFixed(3)}<br>
      Z: ${euler.z.toFixed(3)}
    `;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.currentObject) {
      this.currentObject.quaternion.slerp(
        this.targetQuaternion,
        this.rotationEaseFactor
      );
      this.checkVictory();
    }

    this.updateDebugInfo();
    this.renderer.render(this.scene, this.camera);
  }
}

new RotationPuzzle();

function animateScale(
  object: THREE.Object3D,
  fromScale: number,
  toScale: number,
  duration: number,
  easingFn: (t: number) => number,
  onComplete?: () => void
) {
  const startTime = performance.now();

  function update() {
    const now = performance.now();
    let elapsed = now - startTime;
    let t = Math.min(elapsed / duration, 1);

    const easedT = easingFn(t);
    const currentScale = fromScale + (toScale - fromScale) * easedT;
    object.scale.set(currentScale, currentScale, currentScale);

    if (t < 1) {
      requestAnimationFrame(update);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
