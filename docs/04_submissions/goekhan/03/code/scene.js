import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const textureLoader = new THREE.TextureLoader();

// SCENE
const scene = new THREE.Scene();

// A fog is implemented to give distance to the scene and smoothly transition from the bottom plane to the background color
scene.background = new THREE.Color('#0e6251'); 
//scene.fog = new THREE.FogExp2(scene.background, 0.003);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 85;
camera.position.y = 80;
camera.position.x = 80;

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// We want light to cast a shadow, so we have to enable a shadowMap with certain properties in the render pipeline
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//document.body.appendChild(renderer.domElement);

// CONTROLS FOR NAVIGATION
// Here the camera is given to OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// LIGHTING
// AMBIENT
const ambientLight = new THREE.AmbientLight(0xffffff, 2.9);
scene.add(ambientLight);

//POINT LIGHT
const Moon = new THREE.PointLight(0x00a1ff, 1230);
Moon.position.set(20, 5, 0);

const Moon2 = new THREE.PointLight(0x00a1ff, 1230);
Moon2.position.set(0, 5, 0);

const Moon3 = new THREE.PointLight(0x00a1ff, 1230);
Moon3.position.set(-20, 5, 0);

const Moon4 = new THREE.PointLight(0x00a1ff, 1230);
Moon4.position.set(-40, 5, 0);

const Moon5 = new THREE.PointLight(0x00a1ff, 1230);
Moon5.position.set(-60, 5, 0);

const Moon6 = new THREE.PointLight(0x00a1ff, 1230);
Moon6.position.set(20, 15, 0);

scene.add(Moon);
scene.add(Moon2);
scene.add(Moon3);
scene.add(Moon4);
scene.add(Moon5);
scene.add(Moon6);

//SPHERE MOON HELPER
// const moonHelperGeo = new THREE.SphereGeometry(1, 32, 32);
// const moonHelperMat = new THREE.MeshBasicMaterial({ color: 0x7b7d7d });
// const moonHelper = new THREE.Mesh(moonHelperGeo, moonHelperMat);
// moonHelper.position.copy(Moon.position);
// scene.add(moonHelper);

// GEOMETRY
// PLANE
// const planeGeometry = new THREE.PlaneGeometry(300, 300);
// const planeMaterial = new THREE.MeshStandardMaterial({ color: '#fff05a' });
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// planeMesh.rotation.x = -Math.PI / 2;
// planeMesh.position.y = -10;
// // Enable shadows on the plane
// planeMesh.receiveShadow = true;
// scene.add(planeMesh);

//ZIGGURAT
const zigguratMaterial = new THREE.MeshStandardMaterial({
    color: 0xfff05a, // Brownish color
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x202020,
    emissiveIntensity: 2.3,
});

function createZigguratLevel(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const stoneTexture = textureLoader.load('textures/grunge3.jpg');

  // Apply the texture to the material
  zigguratMaterial.map = stoneTexture;
  zigguratMaterial.map.wrapS = THREE.RepeatWrapping;
  zigguratMaterial.map.wrapT = THREE.RepeatWrapping;
  zigguratMaterial.map.repeat.set(2, 2); // Adjust repeat as needed

  const mesh = new THREE.Mesh(geometry, zigguratMaterial);
  return mesh;
  }
  function createZiggurat(levels) {
    const zigguratGroup = new THREE.Group();
    let currentWidth = 20;
    let currentHeight = 25;
    let currentDepth = 20;
    let yOffset = 0;
  
    for (let i = 0; i < levels; i++) {
      const level = createZigguratLevel(currentWidth, currentHeight, currentDepth);
      level.position.y = yOffset;
      zigguratGroup.add(level);
  
      // Reduce dimensions for the next level
      currentWidth -= 2;
      currentDepth -= 2;
      yOffset += currentHeight;
    }
  
    return zigguratGroup;
  }
  const ziggurat1 = createZiggurat(2);
ziggurat1.position.set(0, 0, 0);
scene.add(ziggurat1);

const ziggurat2 = createZiggurat(10);
ziggurat2.position.set(20, 0, 0);
scene.add(ziggurat2);

const ziggurat3 = createZiggurat(3);
ziggurat3.position.set(-20, 0, 0);
scene.add(ziggurat3);

const ziggurat4 = createZiggurat(4);
ziggurat4.position.set(-40, 0, 0);
scene.add(ziggurat4);

const ziggurat5 = createZiggurat(5);
ziggurat5.position.set(-60, 0, 0);
scene.add(ziggurat5);

const ziggurat6 = createZiggurat(6);
ziggurat6.position.set(-80, 0, 0);
scene.add(ziggurat6);

// ANIMATE/RENDER like draw() in p5
function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);

        //pyramid.rotation.x += 0.024;
        //pyramid.rotation.y += 0.007;

        // icosaWire.rotation.x += 0.001;
        // icosaWire.rotation.z += 0.001;

        //const t = Date.now() / 3000;
        // move light in circle around center
        // change light height with sine curve
        // const r = 3.0;
        // const lx = r * Math.cos(t);
        // const lz = r * Math.sin(t);
        // Moon.position.set(lx, Moon.position.y, lz);
        // moonHelper.position.copy(Moon.position);

        // Animate the waterfall
        //waterfall.position.y = -5 + Math.sin(t * 2) * 0.5;
        // pyramid.position.y = -5 + Math.sin(t * 2) * 0.5;

        //  ziggurat1.scale.y += 0.001;
        ziggurat1.rotation.x -= 0.100;

        ziggurat2.rotation.x = Math.PI;
        ziggurat2.rotation.y += 0.3;

        ziggurat3.rotation.x += 0.080;
        ziggurat4.rotation.x -= 0.060;
        ziggurat5.rotation.x += 0.040;
        ziggurat6.rotation.x -= 0.020;

        controls.update();
        renderer.render(scene, camera);
    }, 1000 / 1000);
}

animate();