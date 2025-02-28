import CV_image from '../assets/Imo_CV_pic.jpg'
import {  OrbitControls } from '@react-three/drei'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { TextureLoader } from "three";
import * as THREE from 'three'
import { geometry } from 'maath'

extend(geometry)

export const CV = () => {

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <OrbitControls />
        <group>
          <mesh>
            <roundedPlaneGeometry args={[5, 5, 0.1]} />
            <meshBasicMaterial />
          </mesh>
          <RoundedImage url={CV_image} position={[0, 0, 0.05]} width={5} height={7} />
        </group>
      </Canvas>
    </div>

  );
};

const RoundedImage = ({ url, position, width = 5, height = 7 }) => {
    const texture = useLoader(TextureLoader, url);
  
    if (!texture) {
      return <mesh position={position}><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="gray" /></mesh>;
    }
  
    return (
      <mesh position={position}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    );
  };