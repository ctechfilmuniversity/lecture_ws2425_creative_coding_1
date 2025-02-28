import profile_pic from '../assets/imo_profile.jpeg'
import {  Text,  OrbitControls } from '@react-three/drei'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { TextureLoader } from "three";
import * as THREE from 'three'
import { geometry } from 'maath'

extend(geometry)

export const About = () => {

  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
        <Text font="/fonts/BebasNeue-Regular.ttf" fontSize={0.6} anchorY="top" anchorX="left" lineHeight={0.8} position={[-1, 3.25, 0]} material-toneMapped={false}>
                About
              </Text>
      <group>

  <mesh>
    <roundedPlaneGeometry args={[5, 5, 0.1]} />
    <meshBasicMaterial color="#a0b0d0" transparent={true} opacity={0.8}  />
  </mesh>


  <RoundedImage url={profile_pic} position={[-0.3, 1.25, 0.05]} width={2} height={2} />


  <Text 
  font="/fonts/RobotoCondensed.ttf"
    color="#1a1e1c" 
    fontSize={0.2} 
    anchorY="top" 
    anchorX="left"
    position={[-2.25, 0, 0.01]} 
    maxWidth={4.5} 
    textAlign="left"
  >
    I am a frontend developer currently pursuing a master's in Creative Technologies at the Film University Babelsberg Konrad Wolf. 
  </Text>

  <Text 
  font="/fonts/RobotoCondensed.ttf"
    color="#1a1e1c" 
    fontSize={0.2} 
    anchorY="top" 
    anchorX="left"
    position={[-2.25, -0.9, 0.01]} 
    maxWidth={4.5} 
    textAlign="left"
  >
    
    After earning my bachelor's degree in film in Johannesburg, I moved to Germany, where I completed a Full Stack Web Development course. 
    With over three years of experience as a frontend developer, I decided to merge my creative background in film with technology, 
    exploring new ways to bridge storytelling and innovation.
  </Text>
</group>

</Canvas>

  );
};

const RoundedImage = ({ url, position, width = 1, height = 1 }) => {
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
