import * as THREE from 'three';
import { PVolumeProps } from './primitiveProps';

const PCylinder: React.FC<PVolumeProps> = ({
  position,
  rotation,
  scale,
  material,
}) => {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  geometry.center();

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

export default PCylinder;
