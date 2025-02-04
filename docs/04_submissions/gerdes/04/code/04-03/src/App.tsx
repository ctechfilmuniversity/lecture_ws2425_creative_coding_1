import './App.css';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';

import Block from './city/Block';

import ControlledPost from './ControlledPost';
import ControlledCam from './ControlledCam';
import ControlledEnv from './ControlledEnv';

const App = () => {
  return (
    <>
      <div
        id='canvas-container'
        className='h-full w-full cursor-crosshair border-2 border-[#ffba70]'
      >
        <Canvas>
          <ControlledCam />
          <Block />
          <ControlledPost />
          <ControlledEnv />
          <ContactShadows scale={30} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
