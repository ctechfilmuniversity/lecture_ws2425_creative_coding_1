import * as THREE from 'three';
// @ts-expect-error - no types available
import Stats from 'three/examples/jsm/libs/stats.module';
import { categories, projects } from './data';
import { AnimationCallback, StartAnimationCompletedCallback } from './types';

const MOVEMENT_SPEED = 0.002;
const LERP_FACTOR = 0.05;
const IS_RENDERER_VISIBLE = false;
const IS_STATS_VISIBLE = false;

export class EnvironmentScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private stats: Stats;

  private globeGroup: THREE.Group;
  private sphere: THREE.Mesh;

  private isDragging: boolean = false;
  private startXY = { x: 0, y: 0 };
  private baseQuaternion = new THREE.Quaternion();
  private targetQuaternion = new THREE.Quaternion();

  private projects: THREE.Mesh[] = [];
  private categories: THREE.Mesh[] = [];

  private animationCallbacks: AnimationCallback[] = [];

  private isStartAnimating: boolean = false;
  private startAnimationProgress: number = 0;
  private startAnimationDuration: number = 2000;
  private startAnimationRotation: number = Math.PI * 2;
  private startScale: number = 0;
  private startAnimationCallbacks: StartAnimationCompletedCallback[] = [];
  private startTime: number | null = null;
  private initialScale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
  private initialRotation: THREE.Quaternion = new THREE.Quaternion();

  private shouldAnimate: boolean = true;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.renderer.domElement.style.display = IS_RENDERER_VISIBLE
      ? 'block'
      : 'none';
    this.renderer.domElement.classList.add('environment-scene');

    this.stats = new Stats();
    if (IS_STATS_VISIBLE) {
      this.stats.dom.style.position = 'absolute';
      document.body.appendChild(this.stats.dom);
    }

    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    const globeRadius = 1;
    const geometry = new THREE.SphereGeometry(globeRadius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.globeGroup.add(this.sphere);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    this.scene.add(dirLight);

    this.addMarkers(globeRadius);
    this.setupMouseEvents();
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.baseQuaternion.copy(this.globeGroup.quaternion);
    this.initialScale.copy(this.globeGroup.scale);

    this.animate();
  }

  public addAnimationCallback(callback: AnimationCallback): () => void {
    this.animationCallbacks.push(callback);

    return () => {
      const index = this.animationCallbacks.indexOf(callback);
      if (index !== -1) {
        this.animationCallbacks.splice(index, 1);
      }
    };
  }

  public removeAnimationCallback(callback: AnimationCallback): void {
    const index = this.animationCallbacks.indexOf(callback);
    if (index !== -1) {
      this.animationCallbacks.splice(index, 1);
    }
  }

  public clearAnimationCallbacks(): void {
    this.animationCallbacks = [];
  }

  private addMarkers(globeRadius: number): void {
    const markerSize = 0.02;

    projects.forEach((proj) => {
      const { lat, lon } = proj.coordinates;
      const marker = this.createMarker(
        lat,
        lon,
        globeRadius,
        markerSize,
        0xff0000
      );
      this.globeGroup.add(marker);
      this.projects.push(marker);
    });

    categories.forEach((cat) => {
      const { lat, lon } = cat.coordinates;
      const marker = this.createMarker(
        lat,
        lon,
        globeRadius,
        markerSize,
        0x0000ff
      );
      this.globeGroup.add(marker);
      this.categories.push(marker);
    });
  }

  public addStartAnimationCompletedCallback(
    callback: StartAnimationCompletedCallback
  ): () => void {
    this.startAnimationCallbacks.push(callback);

    return () => {
      const index = this.startAnimationCallbacks.indexOf(callback);
      if (index !== -1) {
        this.startAnimationCallbacks.splice(index, 1);
      }
    };
  }

  public removeStartAnimationCompletedCallback(
    callback: StartAnimationCompletedCallback
  ): void {
    const index = this.startAnimationCallbacks.indexOf(callback);
    if (index !== -1) {
      this.startAnimationCallbacks.splice(index, 1);
    }
  }

  public clearStartAnimationCompletedCallbacks(): void {
    this.startAnimationCallbacks = [];
  }

  private createMarker(
    latDeg: number,
    lonDeg: number,
    globeRadius: number,
    markerRadius: number,
    color: number
  ): THREE.Mesh {
    const latRad = (latDeg * Math.PI) / 180;
    const lonRad = (lonDeg * Math.PI) / 180;

    const x = globeRadius * Math.cos(latRad) * Math.cos(lonRad);
    const y = globeRadius * Math.sin(latRad);
    const z = globeRadius * Math.cos(latRad) * Math.sin(lonRad);

    const markerGeometry = new THREE.SphereGeometry(markerRadius, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

    markerMesh.position.set(x, y, z);
    return markerMesh;
  }

  private setupMouseEvents(): void {
    document.addEventListener('mousedown', (event: MouseEvent) => {
      this.isDragging = true;
      this.startXY = { x: event.clientX, y: event.clientY };
      this.baseQuaternion.copy(this.globeGroup.quaternion);
    });

    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (!this.isDragging) return;

      const deltaX = (event.clientX - this.startXY.x) * MOVEMENT_SPEED;
      const deltaY = (event.clientY - this.startXY.y) * MOVEMENT_SPEED;

      const yRot = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, -1, 0),
        deltaX
      );
      const xRot = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(-1, 0, 0),
        deltaY
      );

      this.targetQuaternion.copy(this.baseQuaternion);
      this.targetQuaternion.premultiply(yRot);
      this.targetQuaternion.premultiply(xRot);
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.baseQuaternion.copy(this.targetQuaternion);
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public startAnimation(
    options: {
      duration?: number;
      rotation?: number;
      startScale?: number;
    } = {}
  ): void {
    this.isDragging = false;

    this.isStartAnimating = true;
    this.startAnimationProgress = 0;
    this.startTime = null;

    if (options.duration !== undefined) {
      this.startAnimationDuration = options.duration;
    }

    if (options.rotation !== undefined) {
      this.startAnimationRotation = options.rotation;
    }

    if (options.startScale !== undefined) {
      this.startScale = options.startScale;
    } else {
      this.startScale = 0;
    }

    this.initialRotation.copy(this.globeGroup.quaternion);

    this.globeGroup.scale.set(
      this.initialScale.x * this.startScale,
      this.initialScale.y * this.startScale,
      this.initialScale.z * this.startScale
    );
  }

  private animate(): void {
    if (!this.shouldAnimate) {
      return;
    }

    requestAnimationFrame(() => this.animate());

    this.stats.begin();

    if (this.isStartAnimating) {
      const currentTime = performance.now();

      if (this.startTime === null) {
        this.startTime = currentTime;
      }

      const elapsed = currentTime - this.startTime;
      this.startAnimationProgress = Math.min(
        elapsed / this.startAnimationDuration,
        1
      );

      const easedProgress = this.easeInOutCubic(this.startAnimationProgress);

      const scale = this.startScale + (1.0 - this.startScale) * easedProgress;
      this.globeGroup.scale.set(
        this.initialScale.x * scale,
        this.initialScale.y * scale,
        this.initialScale.z * scale
      );

      const rotationQuat = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        this.startAnimationRotation * easedProgress
      );

      const finalQuat = new THREE.Quaternion()
        .copy(this.initialRotation)
        .multiply(rotationQuat);
      this.globeGroup.quaternion.copy(finalQuat);

      if (this.startAnimationProgress >= 1) {
        this.isStartAnimating = false;

        this.baseQuaternion.copy(this.globeGroup.quaternion);
        this.targetQuaternion.copy(this.baseQuaternion);

        for (const callback of this.startAnimationCallbacks) {
          callback();
        }
      }
    } else {
      if (!this.isDragging) {
        const rotationSpeed = 0.0005;

        const deltaQuaternion = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          rotationSpeed
        );

        this.targetQuaternion.premultiply(deltaQuaternion);
      }

      this.globeGroup.quaternion.slerp(this.targetQuaternion, LERP_FACTOR);
    }

    if (this.animationCallbacks.length > 0) {
      const projectsPositions = this.projects.map((marker) =>
        this.getScreenPosition(marker)
      );
      const categoriesPositions = this.categories.map((marker) =>
        this.getScreenPosition(marker)
      );

      for (const callback of this.animationCallbacks) {
        callback(projectsPositions, categoriesPositions);
      }
    }

    this.updateDebugInfo();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
  }

  public activateAnimation() {
    this.shouldAnimate = true;
    this.animate();
  }

  public deactivateAnimation() {
    this.shouldAnimate = false;
  }

  private getScreenPosition(marker: THREE.Mesh): {
    x: number;
    y: number;
    z: number;
  } {
    const pos = new THREE.Vector3();
    marker.getWorldPosition(pos);
    pos.project(this.camera);

    const x = ((pos.x + 1) / 2) * window.innerWidth;
    const y = ((1 - pos.y) / 2) * window.innerHeight;

    return { x, y, z: pos.z };
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private updateDebugInfo(): void {
    const debugEl = document.getElementById('debug');
    if (!debugEl) return;
    const euler = new THREE.Euler().setFromQuaternion(
      this.globeGroup.quaternion,
      'XYZ'
    );
    debugEl.innerHTML = `
      <strong>Rotation (Euler):</strong><br>
      X: ${euler.x.toFixed(3)}<br>
      Y: ${euler.y.toFixed(3)}<br>
      Z: ${euler.z.toFixed(3)}
    `;
  }
}
