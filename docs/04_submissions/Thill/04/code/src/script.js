import * as THREE from 'three'
import { Timer } from 'three/addons/misc/Timer.js'
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

//// Importing Glow Effect

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

///////////////////////// Base Scene

//// Canvas
const canvas = document.querySelector('canvas.webgl')

//// Scene
const scene = new THREE.Scene()



///////////////////////// Lights

const ambientLight = new THREE.AmbientLight('#ffffff', 7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 7)

scene.add(directionalLight)

///////////////////////// Lights

new RGBELoader()
    .load('HDRIs/metro_noord_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture; // Reflections & lighting
        scene.environmentIntensity = 0.04
        // scene.background = texture;  // Visible background
    });


///////////////////////// Meshes

//// Modal Loading Setup

const gltfLoader = new GLTFLoader()
const frontRowInstances = []
const backRowInstances = []
const cloneNumber = 7

//// Loading the front row statues

gltfLoader.load('/models/Creature_02.gltf', (gltf) => {
    createRow(gltf.scene, frontRowInstances, 0)
    // console.log(gltf)
})

//// Loading the back row statues

gltfLoader.load('/models/Creature_2_01.gltf', (gltf) => {
    createRow(gltf.scene, backRowInstances, -0.3)
    // console.log(gltf)
})

//// Audio Cubes

const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
const transparentMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000',
    transparent: true,  
    opacity: 0        
});
const cube = new THREE.Mesh(boxGeometry, transparentMaterial)

const cube2 = new THREE.Mesh(boxGeometry, transparentMaterial)
cube2.position.set(0, 1, 0)

scene.add(cube)
scene.add(cube2)


const planeGeometry = new THREE.PlaneGeometry(30, 20, 50, 50)
const groundMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', wireframe: true})
const plane = new THREE.Mesh(planeGeometry, groundMaterial)
plane.rotation.x = - Math.PI / 2
scene.add(plane)


///////////////////////// Audio

let gain = 0

const listener = new THREE.AudioListener();
let soundOn = true

const sound1 = new THREE.PositionalAudio(listener);
const sound2 = new THREE.PositionalAudio(listener);
const sound3 = new THREE.PositionalAudio(listener);


const audioLoader = new THREE.AudioLoader();
audioLoader.load('audio/Voice_V2.ogg', function(buffer) {
    sound1.setBuffer(buffer)
    sound1.setLoop(true)
    sound1.setRefDistance(20)
});

const audioLoader2 = new THREE.AudioLoader();
audioLoader2.load('audio/Break.ogg', function(buffer) {
    sound2.setBuffer(buffer)
    sound2.setLoop(true)
    sound2.setRefDistance(20)
});

const audioLoader3 = new THREE.AudioLoader();
audioLoader3.load('audio/Melodie.ogg', function(buffer) {
    sound3.setBuffer(buffer)
    sound3.setLoop(true)
    sound3.setRefDistance(20)
});

//// Reverb

const reverb = listener.context.createConvolver();
const impulseLoader = new THREE.AudioLoader();
impulseLoader.load('audio/Arundel_Nave_impulse.ogg', function(buffer) {
    reverb.buffer = buffer;
});

//// Audio Start Trigger

window.addEventListener('click', () => {
    if (!sound1.isPlaying) {
        sound1.play();
        sound2.play();
        sound3.play();
    } else {
        // If already playing, ensure all sounds are synced with sound1
        const currentTime = sound1.context.currentTime - sound1.startTime;
        sound2.offset = currentTime % sound2.buffer.duration;  // Sync sound2
        sound3.offset = currentTime % sound3.buffer.duration;  // Sync sound3
    }
});


cube.add(sound1)
cube.add(sound3)
cube2.add(sound2)



// sound1.setFilter(reverb);

///////////////////////// Key Interaction

const activeKeys = new Set()

//// Listen for key presses
window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase()
    if (['a', 'o', 'e', 'u'].includes(key)) {
        activeKeys.add(key) 
        gain = 1

        const activeIndex = Math.floor(cursor.x * cloneNumber + cloneNumber / 2);  
        updateRotation(frontRowInstances, activeIndex);
        updateRotation(backRowInstances, activeIndex);
    }
})

//// Listen for key releases
window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase()
    activeKeys.delete(key)

    if (activeKeys.size === 0) {
        resetRotation(frontRowInstances)
        resetRotation(backRowInstances)
        gain = 0
    }
})



///////////////////////// Mouse Interaction

const cursor = { x: 0, y: 0 }
const screenSubdivisions = window.innerWidth / cloneNumber

window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX
    const activeIndex = Math.floor(mouseX / screenSubdivisions)

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height -0.5

    if (activeKeys.size > 0) {
        updateRotation(frontRowInstances, activeIndex)
        updateRotation(backRowInstances, activeIndex)
    }

})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Custom Functions


//// Create Row

function createRow(model, instancesArray, zPosition) {
    model.scale.setScalar(0.2)

    const space = 0.65
    const rowWidth = (cloneNumber - 1) * space
    const offSet = - rowWidth / 2

    for (let i = 0; i < cloneNumber; i++) {

        const clone = model.clone()

        clone.position.set(i * space + offSet, 0, zPosition)

        const head = clone.getObjectByName('Head')

        if (head) {
            head.userData.originalRotation = head.rotation.x
            head.userData.targetRotation = head.rotation.x
        }

        instancesArray.push({model: clone, part: head })
        scene.add(clone)

        // console.log(head)
    }
}

//// Update target rotation for a row

function updateRotation(instances, activeIndex) {
    instances.forEach((instance,index) => {
        if (!instance.part) return

        const originalRotation = instance.part.userData.originalRotation || 0


        //// Model with the right index turns by 45  and the two neighbours by 20 degrees

        instance.part.userData.targetRotation =
            (index === activeIndex) ? - Math.PI / 4 :
            (index === activeIndex -1 || index === activeIndex + 1) ? - Math.PI / 9 : 
            originalRotation
    })
}

//// Apply rotation

function applyRotation(instances) {
    instances.forEach((instance) => {
        if (!instance.part) return
        instance.part.rotation.x += (instance.part.userData.targetRotation - instance.part.rotation.x) * 0.1
    })

}

//// Stop rotation

function resetRotation(instances) {
    instances.forEach((instance) => {
        if (!instance.part) return
        instance.part.userData.targetRotation = instance.part.userData.originalRotation || 0
    })
}

//// mouseIsPressed

let mouseIsPressed = false;

window.addEventListener('mousedown', () => {
    mouseIsPressed = true;
});

window.addEventListener('mouseup', () => {
    mouseIsPressed = false;
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// Sizes + Resize Event

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //// Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    //// Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    //// Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



///////////////////////// Camera

//// Creating Camera Group

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const cameraYPosition = 0.8

//// Creating Single Camera

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, cameraYPosition, 1.5)
camera.add(listener);

cameraGroup.add(camera)



///////////////////////// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


///////////////////////// Bloom Effect

const composer = new EffectComposer(renderer)

//// Render whole scene

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

/// Add glow effect

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2,  // Strength of the glow
    0.8,  // Radius
    2  // Threshold (higher = only bright objects glow)
);
composer.addPass(bloomPass)



///////////////////////// Animation Loop

const clock = new Timer()
let previousTiime = 0

const tick = (timestamp) => {
    clock.update(timestamp)
    const deltaTime = clock.getDelta()

    applyRotation(frontRowInstances)
    applyRotation(backRowInstances)

    //////// Camera Animation

    //// Position

    const parallaxX = cursor.x * 0.5
    const parallaxY = cursor.y * 0.5 + cameraYPosition

    camera.position.x += (parallaxX - camera.position.x) * 0.3 * deltaTime
    camera.position.y += (parallaxY - camera.position.y) * 0.3 * deltaTime

    //// Rotation

    const targetRotationY = cursor.x * 0.1
    const targetRotationX = - cursor.y * 0.1

    cameraGroup.rotation.y += (targetRotationY - cameraGroup.rotation.y) * 0.1
    cameraGroup.rotation.x += (targetRotationX - cameraGroup.rotation.x) * 0.1

    //////// Sound Animation

    cube.position.set(
        cursor.x * 6.5,
        cursor.y * -2 + cameraYPosition,
        -3
    )

    // directionalLight.position.set(
    //     cursor.x * 2,
    //     - cursor.y * 1,
    //     1
    // )

    
    const lerpFactor = 0.05
    const targetPosition = new THREE.Vector3(cursor.x * 5, -cursor.y * 5, 1)
    directionalLight.position.lerp(targetPosition, lerpFactor)
    

    const volumeEasingFactor = 0.3;  // Adjust easing speed (lower = smoother)
    sound1.setVolume(sound1.getVolume() + (gain - sound1.getVolume()) * volumeEasingFactor)

    if (!mouseIsPressed) {
        sound3.setVolume(0)
    } else {
        sound3.setVolume(1)
    }



    //// Renderer Update + Callback function

    composer.render()
     window.requestAnimationFrame(tick)
}

tick()