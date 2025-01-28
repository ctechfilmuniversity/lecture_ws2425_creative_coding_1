import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import breathing from "./assets/breathing.wav";
import desert from "./assets/desert.hdr";

let paused = true;
let soundStarted = false;

// SCENE
const scene = new THREE.Scene();
new RGBELoader().load(desert, (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// CAMERA

const fov = 90;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 60;
camera.position.z = -30;
camera.position.y = 10;

// 3. RENDERER
const canvas = document.querySelector("#canvasThree");
const controls = new OrbitControls(camera, canvas);
const radius = 1.3;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("black"); 

//LIGHTING
const directionalLight = new THREE.DirectionalLight(0xff0000, 0.5); 
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xff0000, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

let lightColor = 0xff0000;
const light = new THREE.HemisphereLight(0xffffff, lightColor, 5);
light.position.set(5, 10, 1.25);
scene.add(light);

//AUDIO
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
let analyser;
const audioLoader = new THREE.AudioLoader();
audioLoader.load(breathing, function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(1);
  analyser = new THREE.AudioAnalyser(sound, 32);
});

// GEOMETRY
const sphereGeometry = new THREE.SphereGeometry(radius);
const materialSphere = new THREE.MeshStandardMaterial({ color: 0xdddae4 });
let ghosts = [];
function getGhosts() {
  const mesh = new THREE.Mesh(sphereGeometry, materialSphere);
  let x = THREE.MathUtils.randFloatSpread(20);
  let z = THREE.MathUtils.randFloatSpread(10);
  let y = THREE.MathUtils.randFloatSpread(30); // Start the ghosts at a random height between 10 and 30
  mesh.position.x = x;
  mesh.position.z = z;
  mesh.rotation.x = THREE.MathUtils.randFloatSpread(Math.PI);
  const velocity = {
    x: THREE.MathUtils.randFloatSpread(0.2),
    z: THREE.MathUtils.randFloatSpread(0.2),
  };
  const dampingMult = 1;
  function update(allGhosts) {
    velocity.x *= dampingMult;
    velocity.z *= dampingMult;
    x += velocity.x;
    z += velocity.z;
    mesh.position.x = x;
    mesh.position.z = z;
    const direction = new THREE.Vector3(0, 0, 0);
    allGhosts.forEach((g) => {
      const distance = g.mesh.position.distanceTo(mesh.position);

      if (distance < radius * 2) {
        direction.subVectors(g.mesh.position, mesh.position).normalize().multiplyScalar(0.5);
        g.velocity += direction.x;
        g.velocity += direction.z;
      }
    });
  }
  return {
    update,
    mesh,
    velocity,
  };
}

function startSoundAndGhosts() {
  soundStarted = true;
  if (soundStarted) {
    sound.play();
  }
  paused = false;

  ghosts = [];

  let numGhosts = 100;
  for (let i = 0; i < numGhosts; i++) {
    let ghost = getGhosts();
    scene.add(ghost.mesh);
    ghosts.push(ghost);
  }
}

//'DRAW' FUNCTION
function renderLoop() {
  controls.update();
  camera.position.z = 1;
  requestAnimationFrame(renderLoop);
  if (paused === false) {
    ghosts.forEach((g) => g.update(ghosts));
  }
  if (analyser) {
    const averageFrequency = analyser.getAverageFrequency()
    ghosts.forEach((g) => {
      const scale = Math.max(averageFrequency / 256, 0.1) * 3;
      g.mesh.scale.set(scale, scale, scale);
    });
  }
  renderer.render(scene, camera);
}
renderLoop();

function handleKeyDown(evt) {
  const { key } = evt;
  const ESC = "Escape";
  if (key === ESC) {
    if (paused) {
      startSoundAndGhosts();
    } else {
      sound.stop();
      ghosts.forEach((ghost) => scene.remove(ghost.mesh));
      ghosts = [];
      paused = true;
    }
  }
}
window.addEventListener("keydown", handleKeyDown);
