import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Canvas, extend, useLoader } from '@react-three/fiber'
import {  Text, Image, OrbitControls  } from '@react-three/drei'
import { geometry } from 'maath'
import { TextureLoader } from "three";
import * as THREE from 'three'

extend(geometry)


export const ItemPage = () => {
  const [project, setProject] = useState(null);
  const [match, params] = useRoute("/item/:id");
  
  useEffect(() => {
    if (!params || !params.id) return; 
    
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedProject = data.find((p) => p.id === Number(params.id));
        setProject(selectedProject || null);
      });
  
  }, [params]); 
  

  if (!project) return <p>Loading...</p>;

  return (
    <Canvas>
       <OrbitControls enableZoom={false} />
      <group>
  <mesh>
    <roundedPlaneGeometry args={[7, 5.5, 0.1]} />
    <meshBasicMaterial color="#a0b0d0" transparent={true} opacity={0.8}  />
  </mesh>
     
      <Text font="/fonts/BebasNeue-Regular.ttf" fontSize={0.4} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.5, 2.3, 0.01]} material-toneMapped={false}>{project.name}</Text>
      <RoundedImage url={project.image} position={[0, 0.7, 0.05]} width={3} height={2} />
      <Text color="#1a1e1c"   font="/fonts/RobotoCondensed.ttf" fontSize={0.2} anchorY="top" anchorX="left"  position={[-3, -0.7, 0.01]} material-toneMapped={false}  maxWidth={6} >{project.description} </Text>
 

      <Text color="#1a1e1c"  font="/fonts/BebasNeue-Regular.ttf" fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.5, -2, 0.01]} material-toneMapped={false} onClick={() => window.open(project.link, "_blank")}
      onPointerOver={(e) => (e.object.material.color.set("lightblue"))}
      onPointerOut={(e) => (e.object.material.color.set("blue"))}
      cursor="pointer">Code</Text>
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


