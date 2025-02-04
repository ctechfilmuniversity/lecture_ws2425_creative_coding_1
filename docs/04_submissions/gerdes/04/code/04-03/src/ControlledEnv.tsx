import { Environment } from '@react-three/drei';
import { Euler } from 'three';

import { useControls } from 'leva';

const ControlledEnv = () => {
  const data = useControls('environment', {
    textureIntensity: {
      value: 0.05,
      min: 0,
      max: 1,
      step: 0.01,
    },
    lightIntensity: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.01,
    },
    rotation: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const eulerFrom = (normalized: number): Euler => {
    const angleRadians = normalized * Math.PI * 2;
    return new Euler(0, angleRadians, 0);
  };

  return (
    <>
      <Environment
        environmentRotation={eulerFrom(data.rotation)}
        backgroundRotation={eulerFrom(data.rotation)}
        background
        backgroundIntensity={data.textureIntensity}
        environmentIntensity={data.lightIntensity}
        files='./overcast_soil_puresky_2k.hdr'
      />
    </>
  );
};

export default ControlledEnv;
