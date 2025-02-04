import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import FakeGlowMaterial from './mat/FakeGlowMaterial.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

const loadingManager = new THREE.LoadingManager();

// LOADING SCREEN
loadingManager.onLoad = function () {
    console.log("All assets loaded!");
    document.getElementById('loading-screen').style.display = 'none';
};
const fbxLoader = new FBXLoader(loadingManager);

// Create SCENE
const scene = new THREE.Scene();
const loader = new FBXLoader(loadingManager); // this needs to be on top of every fbx load

// Create CAMERA
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,0);

function updateCamera() {
    if (!boat) return;

    const offset = new THREE.Vector3(0, 10, 15);
    const targetPosition = boat.position.clone().add(offset);

    camera.position.lerp(targetPosition, 0.1);
    camera.lookAt(boat.position);
}

// Create RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Add FOG
scene.fog = new THREE.FogExp2(0x0d0f18, 0.01); // or 0x8b0000
const effectController = {
  turbidity: 5,
  rayleigh: 1,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.7,
  elevation: 2,
  azimuth: 180,
  exposure: 0.6,
};

// SKY
let sky, sun;
function initSky() {
    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);
    sun = new THREE.Vector3();

    if (!renderer) {
        console.error("Renderer not initialized before initSky()");
        return;
    }

    // Sky Parameters
    const effectController = {
      turbidity: 1,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 1,
      azimuth: 180,
      exposure: 0.2
    };

    function updateSky() {
        const uniforms = sky.material.uniforms;
        uniforms["turbidity"].value = effectController.turbidity;
        uniforms["rayleigh"].value = effectController.rayleigh;
        uniforms["mieCoefficient"].value = effectController.mieCoefficient;
        uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);
        uniforms["sunPosition"].value.copy(sun);

        renderer.toneMappingExposure = effectController.exposure;

        // Apply sun position to water reflections
        if (water.material.uniforms["sunDirection"]) {
            water.material.uniforms["sunDirection"].value.copy(sun).normalize();
        }
    }
    updateSky();
}

// Add WATER
const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
const waterNormals = new THREE.TextureLoader().load('./textures/Water_1_M_Normal.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});
const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: waterNormals,
  alpha: 1.0,
  sunColor: 0x8b0000, 
  waterColor: 0x8b0000, 
  distortionScale: 3.0, 
  fog: scene.fog !== undefined,
});

water.rotation.x = -Math.PI / 2;
scene.add(water);

//#region GROUP FIREFLY
const pointLight = new THREE.PointLight(0xffffff, 200, 100);

const sphereGeometry = new THREE.SphereGeometry(0.7, 400, 1000);
const fakeGlowMaterial = new FakeGlowMaterial({
    falloff: 0.5,
    glowInternalRadius: 6.0,
    glowColor: new THREE.Color("#ffffff"),
    glowSharpness: 0.5,
    opacity: 2.3,
    side: THREE.FrontSide,
    depthTest: true,
});

let numSpheres = 500; // Number of spheres to create
for (let i = 0; i < numSpheres; i++) {
    // Create a new sphere mesh for each iteration
    const firefly = new THREE.Mesh(sphereGeometry, fakeGlowMaterial);
    
    // Position the random sphere
    firefly.position.set(
        Math.random() * 800 - 200, //x Math.random() * max - min + min
        Math.random() * 20 + 0, //y
        Math.random() * 800 - 200, //z
    );

    // Add the random sphere to the scene
    scene.add(firefly);
}
//#endregion

//#region BOAT & CONTROL
let boatSpeed = 0.01;
const acceleration = 0.02;
const deceleration = 0.003;
const turnSpeed = Math.PI / 80;
// let = lets you to dinamically change this value 
let moveForward = false;
let turnLeft = false;
let turnRight = false;

// Add BOAT
let boat;
fbxLoader.load('./models/boat.fbx', (loadedBoat) => {
    boat = loadedBoat;
    boat.scale.set(0.08, 0.08, 0.08);
    boat.position.set(0, -0.35, 10);
    boat.rotation.y = MathUtils.degToRad(180);
    scene.add(boat);
});

// Handle key press
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            turnLeft = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            turnRight = true;
            break;
    }
});

// Handle key release
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
        case 'ArrowLeft':
        case 'KeyA':
            turnLeft = false;
        case 'ArrowRight':
        case 'KeyD':
            turnRight = false;
    }
});

// Move Boat Function
function moveBoat() {
    if (!boat) return;
    if (moveForward) {
        boatSpeed = -Math.min(-boatSpeed + acceleration, 0.3); 
    } else {
        boatSpeed = -Math.max(-boatSpeed - deceleration, 0.01);
    }
    boat.position.x -= Math.sin(boat.rotation.y) * boatSpeed;
    boat.position.z -= Math.cos(boat.rotation.y) * boatSpeed;
    if (turnLeft) {
        boat.rotation.y += turnSpeed;
    }
    if (turnRight) {
        boat.rotation.y -= turnSpeed;
    }   
}
//#endregion

//#region TERRAIN
// Add TERRAIN
const terrainGeometry = new THREE.TorusGeometry(1000, 100, 1000, 1000); 
terrainGeometry.rotateX(-Math.PI / 2); 

const position = terrainGeometry.attributes.position;
const noise = new ImprovedNoise();

for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const y = noise.noise(x / 100, z / 90, 10) * 100;
    position.setY(i, y);
}

position.needsUpdate = true;

const terrainMaterial = new THREE.MeshStandardMaterial({
    color: 0x001a33,
    roughness: 1.0,
    wireframe: false,
});

const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.position.set(0, -2, 0);  // Position at the center of the scene
scene.add(terrain);
//#endregion

fbxLoader.load('./models/Tree.fbx', (tree) => {
// Scale and position the tree
tree.scale.set(2, 2, 2);
tree.position.set(0, -10, -100);
tree.rotation.y = MathUtils.degToRad(180);

tree.traverse((child) => {
    if (child.isMesh) {
    child.material = fakeGlowMaterial; // 🟢 Reuse material
    }
    });
    
scene.add(tree);
console.log("Tree model loaded with glow material!");
}, undefined, (error) => {
console.error("Error loading tree model:", error);
});
    

// red=x green=y blue=z
var axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );
axesHelper.position.set(0, 3, 0);

// Handle RESIZING
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let animationActive = true;
// Animation LOOP
function animate() {
    requestAnimationFrame(animate);

    water.material.uniforms['time'].value += 0.1 / 40.0;

    moveBoat();
    updateCamera();
    
    renderer.render(scene, camera);

    if (boat) {
        console.log(`Boat Position - X: ${boat.position.x}, Y: ${boat.position.y}, Z: ${boat.position.z}`);
    }

    death();
}
// Start the animation
animate();
initSky();


function death() {
    if (!boat) return;
    if (
        boat.position.x >= -10 && boat.position.x <= 10 &&  
        boat.position.z >= -105 && boat.position.z <= -80.5 &&
        boat.position.y >= -0.36 && boat.position.z <= -0.33 
    )  
        document.getElementById('death-screen').style.display = 'flex'
}