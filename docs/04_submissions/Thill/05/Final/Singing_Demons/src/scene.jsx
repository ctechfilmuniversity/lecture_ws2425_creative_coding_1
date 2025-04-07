import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls } from 'leva';
import * as THREE from 'three';



function Scene() {
    const { blendFactor, hueOffset, hueRange } = useControls("Demon Colors", {
        blendFactor: { value: 0.38, min: 0, max: 1, step: 0.01 },
        hueOffset: { value: 300, min: 0, max: 360, step: 1 },
        hueRange: { value: 210, min: 10, max: 360, step: 10 }
    });

    useEffect(() => {
        const handleFirstClick = () => {
            if (!hasInteracted) {
                hasInteracted = true;
                playLoopingAudio();
            }
            window.removeEventListener('pointerdown', handleFirstClick);
        };
    
        window.addEventListener('pointerdown', handleFirstClick); 
        return () => window.removeEventListener('pointerdown', handleFirstClick);
    }, []);
    

    useEffect(() => {
        window.mouseX = window.innerWidth / 2;
        const handleMouseMove = (event) => {
            window.mouseX = event.clientX;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!hasInteracted) return;
    
            if (event.key === " ") {
                // Fade in volume
                if (voiceSound && voiceSound.isPlaying) {
                    voiceSound.setVolume(0.7);
                }
            }
        };
    
        const handleKeyUp = (event) => {
            if (event.key === " ") {
                // Fade out volume
                if (voiceSound && voiceSound.isPlaying) {
                    voiceSound.setVolume(0);
                }
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Canvas
                camera={{ position: [0, 0.8, 1.5], fov: 80 }}
                gl={{ powerPreference: "high-performance", alpha: false, antialias: true }}
            >
                <ambientLight intensity={100} />
                <SceneLight />
    
                <Suspense fallback={null}>
                    <Environment
                        files="/HDRIs/metro_noord_1k.hdr"
                        background={false}
                        encoding={THREE.LinearEncoding}
                        rotation={[0, Math.PI, 0]}
                    />
                    <Ground />
                    <DemonRow
                        modelPath="/models/Creature_04.gltf"
                        zPos={0}
                        hueOffset={hueOffset}
                        blendFactor={blendFactor}
                        hueRange={hueRange}
                    />
                    <DemonRow
                        modelPath="/models/Creature_2_03.gltf"
                        zPos={-0.3}
                        hueOffset={hueOffset}
                        blendFactor={blendFactor}
                        hueRange={hueRange}
                    />
                </Suspense>
    
                <EffectComposer>
                    <Bloom intensity={0.1} luminanceThreshold={0.5} luminanceSmoothing={4} kernelSize={4} />
                </EffectComposer>
    
                <CameraController />
            </Canvas>
    
            {/* Space Bar UI */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontFamily: 'monospace',
                color: 'white',
                textShadow: '0 0 10px black',
                pointerEvents: 'none'
            }}>
                [Hold Space Bar]
            </div>
        </div>
    );
    
}


// audio only starts after user interaction
let audioStarted = false;
let hasInteracted = false;
const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener); // Looping break
const voiceSound = new THREE.PositionalAudio(listener); // Voice
const audioLoader = new THREE.AudioLoader();
let voiceBuffer = null;
let breakBuffer = null;

// Load both buffers ahead of time
audioLoader.load("/audio/Voice_V2.ogg", (buffer) => { voiceBuffer = buffer; });
audioLoader.load("/audio/Break.ogg", (buffer) => { breakBuffer = buffer; });


audioLoader.load("/audio/Voice_V2.ogg", (buffer) => {
    voiceBuffer = buffer;
});

function playLoopingAudio() {
    if (!audioStarted) {
        audioStarted = true;

        // Start looping break sound
        audioLoader.load("/audio/Break.ogg", (buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });

        // Start looping voice sound (muted initially)
        if (voiceBuffer) {
            voiceSound.setBuffer(voiceBuffer);
            voiceSound.setRefDistance(1);
            voiceSound.setRolloffFactor(2); // makes spatial difference stronger
            voiceSound.setDistanceModel('linear'); // better stereo separation
            voiceSound.setLoop(true);
            voiceSound.setVolume(0); // Start muted
            voiceSound.play();
        }
        
    }
}


function SceneLight() {
    const lightGroupRef = useRef();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (event) => {
            mouse.current.x = (event.clientX / window.innerWidth - 0.5) * -3;
            mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 3;
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    useFrame(() => {
        if (lightGroupRef.current) {
            lightGroupRef.current.rotation.x = THREE.MathUtils.lerp(lightGroupRef.current.rotation.x, -mouse.current.y, 0.05);
            lightGroupRef.current.rotation.y = THREE.MathUtils.lerp(lightGroupRef.current.rotation.y, mouse.current.x, 0.05);
        }
    });

    return (
        <group ref={lightGroupRef}>
            <directionalLight intensity={7} position={[0, 5, 5]} castShadow />
        </group>
    );
}

function CameraController() {
    const { camera } = useThree();
    const cursor = React.useRef({ x: 0, y: 0 });

    useEffect(() => {
        camera.add(listener);
        camera.add(voiceSound);

        const onMouseMove = (event) => {
            cursor.current.x = (event.clientX / window.innerWidth - 0.5) * 1.5;
            cursor.current.y = (event.clientY / window.innerHeight - 0.5) * 1.5;
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [camera]);

    useFrame(() => {
        // Move the camera
        camera.position.x += (cursor.current.x * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-cursor.current.y * 0.5 + 0.8 - camera.position.y) * 0.02;
        camera.position.z = 1.8;
        camera.lookAt(0, 0.7, 0);

        // Update voiceSound position (e.g. based on actual mouse X)
        const panX = (window.mouseX / window.innerWidth - 0.5) * 10; // exaggerate range
        voiceSound.position.set(panX, 0, 1);
    });

    return null;
}



function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30, 20, 50, 50]} />
            <meshBasicMaterial color="white" wireframe />
        </mesh>
    );
}

function DemonRow({ modelPath, zPos, hueOffset, blendFactor, hueRange }) {
    const { scene } = useGLTF(modelPath);
    const totalDemons = 7;

    return (
        <group>
            {Array.from({ length: totalDemons }).map((_, i) => (
                <Demon 
                    key={i} 
                    model={scene} 
                    position={[i * 0.65 - 1.95, 0, zPos]} 
                    index={i} 
                    totalDemons={totalDemons} 
                    hueOffset={hueOffset} 
                    blendFactor={blendFactor} 
                    hueRange={hueRange} 
                />
            ))}
        </group>
    );
}

function Demon({ model, position, index, totalDemons, hueOffset, blendFactor, hueRange }) {
    const demonRef = useRef();
    const [head, setHead] = useState(null);
    const [openness, setOpenness] = useState(0);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const demonClone = useRef(model.clone());

    useEffect(() => {
        const headObject = demonClone.current.getObjectByName('Head');
        if (headObject) {
            setHead(headObject);
        }

        demonClone.current.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.color.set(getRainbowColor(index, totalDemons, blendFactor, hueOffset, hueRange));
            }
        });
    }, [index, totalDemons]);

    useEffect(() => {
        demonClone.current.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(getRainbowColor(index, totalDemons, blendFactor, hueOffset, hueRange));
            }
        });
    }, [blendFactor, hueOffset, hueRange]);

    // Mouth Animation
    useEffect(() => {
        const onMouseMove = (event) => {
            if (!isSpacePressed) return;

            const screenWidth = window.innerWidth;
            const segmentSize = screenWidth / totalDemons;
            const activeIndex = Math.floor(event.clientX / segmentSize);
            const proximity = Math.abs(index - activeIndex);

            if (proximity === 0) {
                setOpenness(1);
            } else if (proximity === 1) {
                setOpenness(0.5);
            } else {
                setOpenness(0);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [index, isSpacePressed]);

    //  Space Press to open Mouths
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === " ") {
                setIsSpacePressed(true);
            }
        };
        const onKeyUp = (event) => {
            if (event.key === " ") {
                setIsSpacePressed(false);
                setOpenness(0);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, []);

    // Animate the Mouth Opening
    useFrame(() => {
        if (head) {
            const targetRotation = -Math.PI / 4 * openness;
            head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetRotation, 0.1);
        }
    });

    return (
        <group ref={demonRef} position={position}>
            <primitive object={demonClone.current} scale={0.2} />
        </group>
    );
}


// RainbowColor function
function getRainbowColor(index, totalDemons, blendFactor, hueOffset, hueRange) {
    const hue = ((index / totalDemons) * hueRange + hueOffset + 152) % 360; 
    const baseColor = new THREE.Color().setHSL(hue / 360, 1, 0.5);
    baseColor.lerp(new THREE.Color(1, 1, 1), blendFactor);
    return baseColor;
}

export default Scene;
