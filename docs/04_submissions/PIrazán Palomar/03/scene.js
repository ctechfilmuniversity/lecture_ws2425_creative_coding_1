import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// SCENE
const scene = new THREE.Scene();

// A fog is implemented to give distance to the scene and smoothly transition from the bottom plane to the background color
scene.background = new THREE.Color('#2B2B2B');

// FogExp2 gives a clear view near the camera and gets denser farther from the camera
scene.fog = new THREE.FogExp2('#FF34B3', 0.08);


// CAMERA
const fov = 200;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 15;

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight);

// We want light to cast a shadow, so we have to enable a shadowMap with certain properties in the render pipeline
// A shadow map is a texture created from a light's perspective, storing the distance to the nearest surface at each pixel. When rendering the scene from the camera's view, these stored depths are compared with the actual distance to the light to determine if a point is in shadow.
// The basic process: 1. Render scene depth from light's POV, 2. Render scene from camera, comparing depths, 3. If actual distance > stored distance, point is shadowed
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// CONTROLS FOR NAVIGATION
const controls = new OrbitControls(camera, canvas);

// LIGHTING
// AMBIENT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// POINTLIGHT
const pointLight = new THREE.PointLight('#7FFF00', 500);
pointLight.position.set(15,15,15);


// add the point light to the scene
scene.add(pointLight);

// Enabling shadows for the pointlight
// Max and Min Distances are needed for the renderer
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = window.innerWidth;
pointLight.shadow.mapSize.height = window.innerHeight;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 200;

// The radius is the "smoothness" of the light's shadow
pointLight.shadow.radius = 10;
scene.add(pointLight);

// A pointLightHelper draws a bounding box around the light to show us its position in the scene
//const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
//scene.add(pointLightHelper);

// GEOMETRY



const ringGeometry = new THREE.RingGeometry( 7, 30, 25, 25, 0, 6.28318 ); 
const ringMaterial = new THREE.MeshStandardMaterial( { color:'#66cdab', side: THREE.DoubleSide } );
const ringMesh = new THREE.Mesh( ringGeometry, ringMaterial ); scene.add( ringMesh );
ringMesh.rotation.x = 100;
ringMesh.rotation.y = 180;
ringMesh.castShadow = true;
scene.add(ringMesh);

const sphereGeometry = new THREE.SphereGeometry( 15, 36, 14, 4.42964, 1.80327, 4.50504, 6.28318); 
const sphereMaterial = new THREE.MeshStandardMaterial( { color: '#AB82FF' } ); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial ); scene.add( sphere );
sphere.rotation.x = -120;
sphere.rotation.y = -150;
sphere.castShadow = true;
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry( 14, 25, 31); 
const coneMaterial = new THREE.MeshStandardMaterial( {color: '#ADADAD'} );
const cone = new THREE.Mesh( coneGeometry, coneMaterial ); scene.add( cone );
cone.rotation.x = 130;
cone.rotation.y = 145;
cone.castShadow = true;
scene.add(cone);



// RENDERING
renderer.render(scene, camera);

// RENDER LOOP

function renderLoop() {

    ringMesh.rotation.x += 0.002;
    ringMesh.rotation.y += 0.005;

    sphere.rotation.x -= 0.0009;
    sphere.rotation.y -= 0.004;

    cone.rotation.x -= 0.005;
    cone.rotation.y += 0.0008;

    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
}
renderLoop();