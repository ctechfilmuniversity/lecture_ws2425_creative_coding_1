import * as THREE from 'three';
import { PVolumeProps } from './primitiveProps';

const PCube = ({ position, rotation, scale, material }: PVolumeProps) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  return (
    <>
      <mesh
        geometry={geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        material={material}
      />
    </>
  );
};
export default PCube;
