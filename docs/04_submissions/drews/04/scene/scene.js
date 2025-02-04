import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GUI } from 'lil-gui';
import pines from "./assets/pines.hdr"


import hiphopTrack from './assets/hiphop.mp3'
import salsaTrack from './assets/salsa.mp3'
import twerkTrack from './assets/twerk.mp3'
import zombieTrack from './assets/zombie_sound.mp3'

// RENDERER
const canvas = document.querySelector("#canvasThree");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// SCENE
const scene = new THREE.Scene();

new RGBELoader().load(pines, (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
  scene.envMapIntensity = 0.5; 
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.1; 

// CAMERA
const fov = 90;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 5;
camera.position.z = 5;
camera.position.y = -100;
camera.lookAt(-10, -100, 0); // Ensure the camera looks at them

// ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = true;  
controls.zoomSpeed = 2.0; 
controls.minDistance = 5;  
controls.maxDistance = 100; 
controls.maxPolarAngle = Math.PI / 2;  
controls.enableDamping = true; 
controls.dampingFactor = 0.1; 
camera.position.set( 0, 20, 100 );
controls.update();


//LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 15); 
scene.add(ambientLight);

// GEOMETRY
let zombies = [];  
let mixers = [];  

const clock = new THREE.Clock();
const fbxLoader = new FBXLoader();
const gui = new GUI();

const zombieAnimations = {
  Idle: '/assets/funny-zombie/zombie_idle.fbx',
  WalkInPlace: '/assets/funny-zombie/zombie_walk_in_place.fbx',
  HipHop: '/assets/funny-zombie/Hip_Hop_Dancing.fbx',
  Salsa: '/assets/funny-zombie/RumbaDancing.fbx',
  Modern: '/assets/funny-zombie/Dancing_Twerk.fbx',
};

const animationConfig = {
  selectedAnimation: 'Idle' 
};


const loadZombies = (numZombies) => {
  const groupOffsetX = -150; 
  const groupOffsetZ = -150; 
  const spacing = 70;

  for (let i = 0; i < numZombies; i++) {
    fbxLoader.load('./assets/funny-zombie/Mremireh_O_Desbiens.fbx', (object) => {
      object.scale.setScalar(0.6);

      object.position.set(
        groupOffsetX + (i % 5) * spacing, 
        -100,                             
        groupOffsetZ + Math.floor(i / 5) * spacing 
      );

      scene.add(object);
      zombies.push(object);

      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (zombies.length === numZombies) {
        loadAnimation(animationConfig.selectedAnimation);
      }
     
    });
  }
};
const animationAudioMap = {
  WalkInPlace: zombieTrack,
  HipHop: hiphopTrack,
  Modern: twerkTrack,
  Salsa: salsaTrack
};

const loadAnimation = (animationName) => {
  if (!zombies.length || !zombieAnimations[animationName]) return;

  fbxLoader.load(zombieAnimations[animationName], (animation) => {
    if (!animation.animations.length) {
      console.warn("No animations found in file:", animationName);
      return;
    }

    mixers.forEach(mixer => mixer.stopAllAction()); 
    mixers = []; 

    zombies.forEach((zombie) => {
      const mixer = new THREE.AnimationMixer(zombie);
      mixers.push(mixer);

      const action = mixer.clipAction(animation.animations[0]);
      action.reset();
      action.play();
    });
    if (animationName === 'Idle') {
      sound.stop();
      currentTrack = null;
    } else if (animationAudioMap[animationName]) {
      playAudio(animationAudioMap[animationName]);
    }
  });
};


gui.add(animationConfig, 'Select Dance', Object.keys(zombieAnimations))
  .onChange(loadAnimation);

loadZombies(10);

// AUDIO
let currentTrack = null; 
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
let analyser = new THREE.AudioAnalyser(sound, 32);
const audioLoader = new THREE.AudioLoader()

function playAudio(audioTrack) {
  if (sound.isPlaying) {
    sound.stop(); 
  }

  audioLoader.load(audioTrack, function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(1);
    sound.play();
    analyser = new THREE.AudioAnalyser(sound, 32);
  });

  currentTrack = audioTrack; 
}


//'DRAW' FUNCTION
function renderLoop() {
  requestAnimationFrame(renderLoop);

  const delta = clock.getDelta();
  mixers.forEach(mixer => mixer.update(delta));
 
  controls.update();
 
  renderer.render(scene, camera);
}
renderLoop();

