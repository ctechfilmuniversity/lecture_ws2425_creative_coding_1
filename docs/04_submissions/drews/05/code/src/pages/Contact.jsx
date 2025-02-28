import {  Text,  OrbitControls } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import { geometry } from 'maath'

extend(geometry)


export const Contact = () => {

  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
       <Text font="/fonts/BebasNeue-Regular.ttf" fontSize={0.6} anchorY="top" anchorX="left" lineHeight={0.8} position={[-1.5, 2, 0]} material-toneMapped={false}>
                Contact
              </Text>
      <group>
 
  <mesh position={[-0.5, 0.3 , 0]}>
    <roundedPlaneGeometry args={[4, 1.5, 0.1]} />
    <meshBasicMaterial color="#a0b0d0" transparent={true} opacity={0.8}  />
  </mesh>

  
  <Text 
  font="/fonts/RobotoCondensed.ttf"
    color="#1a1e1c" 
    fontSize={0.2} 
    anchorY="top" 
    anchorX="left"
    position={[-2, 0.75, 0.01]} 
    maxWidth={4} 
    textAlign="left"
  >
Email: imoleadrews@gmail.com
  </Text>
  
  <Text 
  font="/fonts/RobotoCondensed.ttf"
    color="#1a1e1c" 
    fontSize={0.2} 
    anchorY="top" 
    anchorX="left"
    position={[-2, 0, 0.01]} 
    maxWidth={4.5} 
    textAlign="left"
  >
    Number: +49 151 127 31191
  </Text>
</group>

</Canvas>

  );
};

