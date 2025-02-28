
import * as THREE from 'three'
import React, {  useState, useEffect } from 'react'
import { Canvas, useLoader, extend } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { useLocation, Link } from 'wouter'
import { TextureLoader } from "three";
import { geometry } from 'maath'

extend(geometry)

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
  
  const Frame = ({ id, name, bg, image, position, width = 2, height = 1, setLocation }) => {
    return (
      <group position={position} onClick={() => setLocation(`/item/${id}`)} cursor="pointer">
        <Text color="#a0b0d0" font="/fonts/RobotoCondensed.ttf" fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.5, 0.815, 0.01]} material-toneMapped={false}>
          {name}
        </Text>
        <mesh>
          <roundedPlaneGeometry  args={[width, height, 0.1]} />
          <meshStandardMaterial color={bg} />
        </mesh>
        <RoundedImage url={image} position={[0, 0, 0.05]} width={width} height={height} />
      </group>
    );
  };
  

  export const HomePage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
  
      fetch("/data/projects.json") 
    
        .then((response) => response.json())
        .then((data) => setProjects(data));
    }, []);
    
    console.log('what is projects', projects)
    
    const [, setLocation] = useLocation(); 
    return(
    <Canvas style={{ width: "100vw", height: "100vh" }} camera={{ fov: 75, position: [0, 0, 5] }}>
      <OrbitControls enableZoom={false} />
      
      <Text color="#F6F4F2" font="/fonts/BebasNeue-Regular.ttf" fontSize={0.8} anchorY="top" anchorX="left" lineHeight={0.8} position={[-2.5, 3, 0]} material-toneMapped={false}>
          Imogen Drews
        </Text>
           {/* Navigation links */}
           <group onClick={() => setLocation('/about')} cursor="pointer">
                <Text color="#a0b0d0" font="/fonts/RobotoCondensed.ttf" fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-3, 2, 0]} material-toneMapped={false}>
                    About
                </Text>
            </group>

            <group onClick={() => setLocation('/cv')} cursor="pointer">
                <Text color="#a0b0d0" font="/fonts/RobotoCondensed.ttf" fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-1, 2, 0]} material-toneMapped={false}>
                    CV
                </Text>
            </group>

            <group onClick={() => setLocation('/contact')} cursor="pointer">
                <Text color="#a0b0d0" font="/fonts/RobotoCondensed.ttf" fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[1, 2, 0]} material-toneMapped={false}>
                    Contact
                </Text>
            </group>

            {projects.map((project, index) => (
  <Frame
    key={project.id}
    id={project.id}
    name={project.name}
    image={project.image}
    bg={"#e4cdac"}
    position={[(index % 3) * 3 - 3.5, Math.floor(index / 3) * -2, 0]}
    width={2}
    height={1}
    setLocation={setLocation} 
  />
))}
    </Canvas>
  )}

  