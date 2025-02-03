import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import './style.css';

interface ScaleImages {
  yScale: ImageData | string;
  xzScale: ImageData | string;
}

interface GridConfig {
  gridSize: number;
  spacing: number;
  baseSize: {
    y: number;
    xz: number;
  };
  scaleMultiplier: {
    y: number;
    xz: number;
  };
}

class GridVisualizer {
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;

  private readonly orbitControls: OrbitControls;
  private readonly trackballControls: TrackballControls;

  private instancedMesh!: THREE.InstancedMesh;

  private readonly currentScales: Float32Array;
  private readonly targetScales: Float32Array;

  private readonly config: GridConfig;

  private readonly transformObject: THREE.Object3D;

  private isAnimating = false;

  private readonly labelElement: HTMLElement | null;

  private static readonly BACKGROUND_COLOR = 0xfff8ea;

  constructor(container: HTMLElement, config: GridConfig) {
    this.config = config;

    const totalInstances = this.config.gridSize * this.config.gridSize;
    this.currentScales = new Float32Array(totalInstances * 3).fill(1);
    this.targetScales = new Float32Array(totalInstances * 3).fill(1);

    this.transformObject = new THREE.Object3D();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GridVisualizer.BACKGROUND_COLOR);

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 80, 25);
    this.camera.lookAt(new THREE.Vector3(0, -100, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.LinearToneMapping;
    this.renderer.toneMappingExposure = 1;

    container.appendChild(this.renderer.domElement);

    this.addBasePlane('./straßen.png', 1100);

    this.orbitControls = this.initOrbitControls();
    this.trackballControls = this.initTrackballControls();

    this.initializeGrid();

    this.animate();

    this.labelElement = document.getElementById('berlin-label');
  }

  private addBasePlane(texturePath: string, size: number): void {
    const planeGeometry = new THREE.PlaneGeometry(size, size);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texturePath);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1,
      opacity: 0.6,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    this.scene.add(plane);
  }

  private initOrbitControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.enableRotate = false;
    controls.enableZoom = false;

    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    controls.enablePan = true;
    controls.screenSpacePanning = true;

    return controls;
  }

  private initTrackballControls(): TrackballControls {
    const controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    controls.noRotate = true;
    controls.noPan = true;
    controls.noZoom = false;
    controls.zoomSpeed = 1.5;
    controls.dynamicDampingFactor = 0.2;
    controls.maxDistance = 250;
    controls.minDistance = 40;
    return controls;
  }

  private initializeGrid(): void {
    const { gridSize, spacing, baseSize } = this.config;
    const geometry = new THREE.BoxGeometry(
      baseSize.xz,
      baseSize.y,
      baseSize.xz
    );

    const texture = new THREE.TextureLoader().load('./texture_1.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      gridSize * gridSize
    );

    const offset = (gridSize * spacing) / 2;
    let index = 0;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        this.transformObject.position.set(
          x * spacing - offset,
          0,
          z * spacing - offset
        );
        this.transformObject.updateMatrix();
        this.instancedMesh.setMatrixAt(index, this.transformObject.matrix);
        index++;
      }
    }

    this.scene.add(this.instancedMesh);
  }

  private async loadImage(source: ImageData | string): Promise<ImageData> {
    if (source instanceof ImageData) {
      return source;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.config.gridSize;
        canvas.height = this.config.gridSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('2D context not available.'));
          return;
        }

        ctx.drawImage(img, 0, 0, this.config.gridSize, this.config.gridSize);
        resolve(
          ctx.getImageData(0, 0, this.config.gridSize, this.config.gridSize)
        );
      };

      img.onerror = () =>
        reject(new Error(`Failed to load image at ${source}`));
      img.src = source;
    });
  }

  public async updateFromImages(images: ScaleImages): Promise<void> {
    try {
      const [yScaleData, xzScaleData] = await Promise.all([
        this.loadImage(images.yScale),
        this.loadImage(images.xzScale),
      ]);

      this.updateScalesFromImageData(yScaleData, xzScaleData);
    } catch (error) {
      console.error('Error loading images:', error);
      throw error;
    }
  }

  private updateScalesFromImageData(
    yScaleImage: ImageData,
    xzScaleImage: ImageData
  ): void {
    const { gridSize, scaleMultiplier } = this.config;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const index = x * gridSize + z;
        const pixelIndex = (x + z * gridSize) * 4;

        const yValue = yScaleImage.data[pixelIndex] / 255;
        const xzValue = xzScaleImage.data[pixelIndex] / 255;

        const yScale = (1 - yValue) * scaleMultiplier.y;
        const xzScale = (1 - xzValue) * scaleMultiplier.xz;

        this.targetScales[index * 3] = Math.max(0.1, xzScale);
        this.targetScales[index * 3 + 1] = Math.max(0.1, yScale);
        this.targetScales[index * 3 + 2] = Math.max(0.1, xzScale);
      }
    }

    this.isAnimating = true;
  }

  private updateInstanceMatrices(): void {
    const { gridSize, spacing } = this.config;
    const offset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const i = x * gridSize + z;

        this.transformObject.position.set(
          x * spacing - offset,
          0,
          z * spacing - offset
        );
        this.transformObject.rotation.set(0, 0, 0);
        this.transformObject.scale.set(
          this.currentScales[i * 3],
          this.currentScales[i * 3 + 1],
          this.currentScales[i * 3 + 2]
        );

        this.transformObject.matrix.identity();
        this.transformObject.updateMatrix();

        this.instancedMesh.setMatrixAt(i, this.transformObject.matrix);
      }
    }
    this.instancedMesh.instanceMatrix.needsUpdate = true;
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    if (this.isAnimating) {
      const lerpFactor = 0.05;
      let stillAnimating = false;

      for (let i = 0; i < this.currentScales.length; i++) {
        const diff = this.targetScales[i] - this.currentScales[i];
        if (Math.abs(diff) > 0.001) {
          this.currentScales[i] += diff * lerpFactor;
          stillAnimating = true;
        } else {
          this.currentScales[i] = this.targetScales[i];
        }
      }

      this.updateInstanceMatrices();
      this.isAnimating = stillAnimating;
    }

    this.orbitControls.update();
    this.trackballControls.target.copy(this.orbitControls.target);
    this.trackballControls.update();

    this.renderer.render(this.scene, this.camera);

    if (this.labelElement) {
      const labelPos = new THREE.Vector3(0, 0, 0).project(this.camera);
      const x = (labelPos.x * 0.5 + 0.5) * this.renderer.domElement.clientWidth;
      const y =
        (-labelPos.y * 0.5 + 0.5) * this.renderer.domElement.clientHeight;
      this.labelElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }
  };

  public resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    this.renderer.dispose();
    this.instancedMesh.geometry.dispose();

    const { material } = this.instancedMesh;
    if (Array.isArray(material)) {
      material.forEach((mat) => mat.dispose());
    } else {
      material.dispose();
    }
  }
}

const config: GridConfig = {
  gridSize: 300,
  spacing: 1.2,
  baseSize: {
    y: 1,
    xz: 0.1,
  },
  scaleMultiplier: {
    y: 3.0,
    xz: 8.0,
  },
};

const imagesVersiegelung: ScaleImages = {
  yScale: './versiegelung_1.png',
  xzScale: './versiegelung_1.png',
};

const imagesKuehlvermoegen: ScaleImages = {
  yScale: './kuehlvermoegen_1.png',
  xzScale: './kuehlvermoegen_1.png',
};

const descriptionSoilSealing = `
Soil sealing is the covering of natural ground with impermeable materials 
like asphalt and concrete, which prevents water infiltration and harms the environment. 
This practice, common in urban development, leads to increased flood risks and higher 
surface temperatures, though solutions like permeable paving can help reduce these 
negative effects.
`;

const descriptionCoolingCapacity = `
The cooling capacity of soil describes its ability to absorb and store heat, 
which strongly depends on the soil type, water content, and humus content. 
Moist and clay-rich soils can store more heat than dry, sandy soils, while 
the humus content additionally improves the water retention capacity. 
This natural cooling ability is significantly reduced in areas with high soil sealing, 
as artificial surfaces prevent water retention and natural soil processes. 
Areas appearing in darker colors on the map indicate higher cooling capacity, 
typically found in natural and unsealed areas.
`;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const soilSealingBtn = document.getElementById('soil-sealing');
  const coolingCapacityBtn = document.getElementById('cooling-capacity');
  const descriptionElement = document.getElementById('description');

  if (
    !container ||
    !soilSealingBtn ||
    !coolingCapacityBtn ||
    !descriptionElement
  ) {
    return;
  }

  const visualizer = new GridVisualizer(container, config);

  window.addEventListener('resize', () => {
    visualizer.resize(container.clientWidth, container.clientHeight);
  });

  visualizer.updateFromImages(imagesVersiegelung).catch(console.error);

  soilSealingBtn.addEventListener('click', () => {
    visualizer.updateFromImages(imagesVersiegelung).catch(console.error);
    soilSealingBtn.classList.add('active');
    coolingCapacityBtn.classList.remove('active');
    descriptionElement.textContent = descriptionSoilSealing;
  });

  coolingCapacityBtn.addEventListener('click', () => {
    visualizer.updateFromImages(imagesKuehlvermoegen).catch(console.error);
    coolingCapacityBtn.classList.add('active');
    soilSealingBtn.classList.remove('active');
    descriptionElement.textContent = descriptionCoolingCapacity;
  });
});
