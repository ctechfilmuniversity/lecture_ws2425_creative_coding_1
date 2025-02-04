import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import Building from './Building';
import PostProcessing from './PostProcessor';

const App = () => {
  return (
    <>
      <div
        id='canvas-container'
        className='h-full w-full cursor-crosshair border-2 border-[#ffba70]'
      >
        <Canvas>
          <OrbitControls
            autoRotate
            autoRotateSpeed={2}
            minDistance={2}
            maxDistance={18}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            target={new THREE.Vector3(0, 1, 0)}
          />
          <Environment
            background
            backgroundIntensity={0.05}
            environmentIntensity={0.2}
            files='./overcast_soil_puresky_2k.hdr'
          />
          <ContactShadows />
          <PostProcessing />
          <Building scale={0.1} yOffset={0.05} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
