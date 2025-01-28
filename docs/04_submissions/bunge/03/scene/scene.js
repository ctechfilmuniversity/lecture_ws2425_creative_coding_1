import * as THREE from 'three';
import * as ORBIT from 'three/addons/controls/OrbitControls.js';
import { Water } from 'three/addons/objects/Water.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { fog } from 'three/tsl';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import FakeGlowMaterial from './mat/FakeGlowMaterial.js'


const { MathUtils, Vector3} = THREE;

console.log("My Three Object:", THREE);

// Create SCENE
const scene = new THREE.Scene();

// Create CAMERA
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40);

// Create RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add ORBIT CONTROLS
const controls = new ORBIT.OrbitControls(camera, canvas);
scene.add(controls);

// Add LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Add SKY
const sky = new Sky();
sky.scale.setScalar(45000);

const phi = MathUtils.degToRad(92);
const theta = MathUtils.degToRad(180);
const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

sky.material.uniforms.sunPosition.value = sunPosition;

//scene.add(sky);

// Add FOG
scene.fog = new THREE.Fog(0x000000, -80, 100);
scene.add(fog);

// Add WATER
const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
const waterNormals = new THREE.TextureLoader().load('./textures/waternormals.jpg', (texture) => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});

const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: waterNormals,
  alpha: 2.0,
  sunDirection: sunPosition.clone().normalize(),
  sunColor: 0xffffff,
  waterColor: 0xffffff,
  distortionScale: 3.7,
  fog: scene.fog !== undefined,
});
water.rotation.x = -Math.PI / 2;
scene.add(water);

// Add CUBE
//const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
//const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive:0xFFFFFF, emissiveIntensity: 800 });
//const cube = new THREE.Mesh(geometry, material);
//cube.position.set(-5, 8, 5);
//scene.add(cube);

//#region LIGHT AND SPHERE
// Add Cube LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 200, 100); //  color, intensity: 2, distance: 10
pointLight.position.set(-5, 8, 5); 
scene.add(pointLight);

// Add Glowing Sphere
const sphereGeometry = new THREE.SphereGeometry(0.7, 400, 1000); // size, glow (or near?), transparence

// Glowing Sphere Parameter
const fakeGlowMaterial = new FakeGlowMaterial({
    falloff: 0.5, // Glow falloff
    glowInternalRadius: 6.0, // Internal radius for glow
    glowColor: new THREE.Color("#ffffff"), // Red glow color
    glowSharpness: 0.5, // Sharpness of the glow
    opacity: 2.3, // Opacity of the glow (high values can cause issues)
    side: THREE.FrontSide, // Render the glow on the front side
    depthTest: true, // Whether to perform depth testing (usually true)
});

const sphere = new THREE.Mesh(sphereGeometry, fakeGlowMaterial);
sphere.position.set(-5, 8, 5);
scene.add(sphere);
//#endregion

//#region LIGHT AND SPHERE 2
// Add Cube LIGHTS
const pointLight2 = new THREE.PointLight(0xffffff, 200, 100); //  color, intensity: 2, distance: 10
pointLight2.position.set(-15, 0, 5); 
scene.add(pointLight2);

// Add Glowing Sphere
const sphereGeometry2 = new THREE.SphereGeometry(0.7, 400, 1000); // size, glow (or near?), transparence

// Glowing Sphere Parameter
const fakeGlowMaterial2 = new FakeGlowMaterial({
    falloff: 0.5, // Glow falloff
    glowInternalRadius: 6.0, // Internal radius for glow
    glowColor: new THREE.Color("#ffffff"), // Red glow color
    glowSharpness: 0.5, // Sharpness of the glow
    opacity: 2.3, // Opacity of the glow (high values can cause issues)
    side: THREE.FrontSide, // Render the glow on the front side
    depthTest: true, // Whether to perform depth testing (usually true)
});

const sphere2 = new THREE.Mesh(sphereGeometry2, fakeGlowMaterial2);
sphere2.position.set(-15, 0, 5);
scene.add(sphere2);
//#endregion

//#region LIGHT AND SPHERE 3
// Add Cube LIGHTS
const pointLight3 = new THREE.PointLight(0xffffff, 200, 100); //  color, intensity: 2, distance: 10
pointLight3.position.set(20, 0, -10); 
scene.add(pointLight3);

// Add Glowing Sphere
const sphereGeometry3 = new THREE.SphereGeometry(0.7, 400, 1000); // size, glow (or near?), transparence

// Glowing Sphere Parameter
const fakeGlowMaterial3 = new FakeGlowMaterial({
    falloff: 0.5, // Glow falloff
    glowInternalRadius: 6.0, // Internal radius for glow
    glowColor: new THREE.Color("#ffffff"), // Red glow color
    glowSharpness: 0.5, // Sharpness of the glow
    opacity: 2.3, // Opacity of the glow (high values can cause issues)
    side: THREE.FrontSide, // Render the glow on the front side
    depthTest: true, // Whether to perform depth testing (usually true)
});

const sphere3 = new THREE.Mesh(sphereGeometry3, fakeGlowMaterial3);
sphere3.position.set(20, 0, -10);
scene.add(sphere3);
//#endregion

//#region LIGHT AND SPHERE 4
// Add Cube LIGHTS
const pointLight4 = new THREE.PointLight(0xffffff, 200, 100); //  color, intensity: 2, distance: 10
pointLight4.position.set(-20, 0, -20); 
scene.add(pointLight4);

// Add Glowing Sphere
const sphereGeometry4 = new THREE.SphereGeometry(0.7, 400, 1000); // size, glow (or near?), transparence

// Glowing Sphere Parameter
const fakeGlowMaterial4 = new FakeGlowMaterial({
    falloff: 0.5, // Glow falloff
    glowInternalRadius: 6.0, // Internal radius for glow
    glowColor: new THREE.Color("#ffffff"), // Red glow color
    glowSharpness: 0.5, // Sharpness of the glow
    opacity: 2.3, // Opacity of the glow (high values can cause issues)
    side: THREE.FrontSide, // Render the glow on the front side
    depthTest: true, // Whether to perform depth testing (usually true)
});

const sphere4 = new THREE.Mesh(sphereGeometry4, fakeGlowMaterial4);
sphere4.position.set(-20, 0, -20);
scene.add(sphere4);
//#endregion

//#region LIGHT AND SPHERE 5
// Add Cube LIGHTS
const pointLight5 = new THREE.PointLight(0xffffff, 200, 100); //  color, intensity: 2, distance: 10
pointLight5.position.set(20, 2, 10); 
scene.add(pointLight5);

// Add Glowing Sphere
const sphereGeometry5 = new THREE.SphereGeometry(0.7, 400, 1000); // size, glow (or near?), transparence

// Glowing Sphere Parameter
const fakeGlowMaterial5 = new FakeGlowMaterial({
    falloff: 0.5, // Glow falloff
    glowInternalRadius: 6.0, // Internal radius for glow
    glowColor: new THREE.Color("#ffffff"), // Red glow color
    glowSharpness: 0.5, // Sharpness of the glow
    opacity: 2.3, // Opacity of the glow (high values can cause issues)
    side: THREE.FrontSide, // Render the glow on the front side
    depthTest: true, // Whether to perform depth testing (usually true)
});

const sphere5 = new THREE.Mesh(sphereGeometry5, fakeGlowMaterial5);
sphere5.position.set(20, 2, 10);
scene.add(sphere5);
//#endregion

// Add Boat
const loader = new FBXLoader();
loader.load('./models/boat.fbx',(boat) => {
boat.scale.set(0.13, 0.13, 0.13); 
boat.position.set(0, -1.1, 0);
boat.rotation.y = -30;
const boatMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, emissive:0x000000, emissiveIntensity: 0 });
// ignore model materials and force apply mine -> standardmesh black
boat.traverse((child) => {
  if (child.isMesh) {
      child.material = boatMaterial;
  }
});
scene.add(boat); 
});

// Handle RESIZING
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Animation LOOP
function animate() {
  requestAnimationFrame(animate);

  // Animate water
  water.material.uniforms['time'].value += 0.6 / 90.0;

  controls.update();
  renderer.render(scene, camera);
}

// Start the animation
animate();
