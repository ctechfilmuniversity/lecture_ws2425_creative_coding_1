import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { SRGBColorSpace } from 'three';

////////////////// DEBUG

const gui = new GUI({
    width: 300,
    title: 'Control',
    closeFolders: false
})

const cubeTewaks = gui.addFolder('Spheres')

// cubeTewaks.close()

// gui.hide()

// gui.close()

const debugObject = {}
window.addEventListener('keydown', (event) => 
    {
        if(event.key == 'h')
            gui.show(gui._hidden)
    })

////////////////// BASE

//// Canvas
const canvas = document.querySelector('canvas.webgl')

//// Scene
const scene = new THREE.Scene()

////////////////// Loading Textures

const textureLoader = new THREE.TextureLoader();

const matcap01 = textureLoader.load('./img/1.png')
const matcap02 = textureLoader.load('./img/2.png')
const matcap03 = textureLoader.load('./img/3.png')
const matcap04 = textureLoader.load('./img/4.png')
const matcap05 = textureLoader.load('./img/5.png')
const matcap06 = textureLoader.load('./img/6.png')

////////////////// OBJECTS

const geometry = new THREE.SphereGeometry(0.9, 50, 50)

const material01 = new THREE.MeshMatcapMaterial({ matcap: matcap01 })
const material02 = new THREE.MeshMatcapMaterial({ matcap: matcap02 })
const material03 = new THREE.MeshMatcapMaterial({ matcap: matcap03 })
const material04 = new THREE.MeshMatcapMaterial({ matcap: matcap04 })
const material05 = new THREE.MeshMatcapMaterial({ matcap: matcap05 })
const material06 = new THREE.MeshMatcapMaterial({ matcap: matcap06 })

material01.matcap.colorSpace = SRGBColorSpace;
material02.matcap.colorSpace = SRGBColorSpace;
material03.matcap.colorSpace = SRGBColorSpace;
material04.matcap.colorSpace = SRGBColorSpace;
material05.matcap.colorSpace = SRGBColorSpace;
material06.matcap.colorSpace = SRGBColorSpace;


const mesh01 = new THREE.Mesh(geometry, material01)
const mesh02 = new THREE.Mesh(geometry, material02)
const mesh03 = new THREE.Mesh(geometry, material03)
const mesh04 = new THREE.Mesh(geometry, material04)
const mesh05 = new THREE.Mesh(geometry, material05)
const mesh06 = new THREE.Mesh(geometry, material06)


// mesh03.position.x = 2
// mesh02.position.x = -2

scene.add(mesh02)

const meshContainer = [mesh01, mesh02, mesh03, mesh04, mesh05, mesh06]

/////////////////// CLONES

const allMeshes = [];
const targetScale = { value: 1 }; 

allMeshes.push(mesh02);

for (let i = 0; i <500; i++) {
    //// Pick a random sphere from the container
    const randomMesh = meshContainer[Math.floor(Math.random() * meshContainer.length)];

    //// Create a new mesh with the same geometry and material
    const newMesh = new THREE.Mesh(randomMesh.geometry, randomMesh.material);

    //// Random positioning 
    newMesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
    );

    scene.add(newMesh);
    allMeshes.push(newMesh);
}

const params = { size: 1 };

//// GUI Controls

cubeTewaks
    .add(targetScale, 'value')
    .min(0.1)
    .max(3)
    .step(0.01)
    .name('Uniform Size');

////////////////// SIZES

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

////////////////// CAMERA

//// Create a group to hold the camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

//// Base camera
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5; // Set initial position
cameraGroup.add(camera);

//// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

////////////////// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = SRGBColorSpace;

////////////////// ANIMATION

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //// Rotate the camera group
    cameraGroup.rotation.y = elapsedTime * -0.1; 

    //// Damped scaling
    const dampingFactor = 0.1; // Smoothness
    allMeshes.forEach(mesh => {
        const currentScale = mesh.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale.value, dampingFactor);
        mesh.scale.set(newScale, newScale, newScale);
    });

    //// Update controls
    controls.update()

    //// Render
    renderer.render(scene, camera)

    //// Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()