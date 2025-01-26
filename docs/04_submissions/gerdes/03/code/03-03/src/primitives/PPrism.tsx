import * as THREE from 'three';
import { PVolumeProps } from './primitiveProps';

const PPrism: React.FC<PVolumeProps> = ({
  position,
  rotation,
  scale,
  material,
}) => {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(1, 0);
  shape.lineTo(1, 1);
  shape.closePath();

  const extrudeSettings = {
    depth: 1,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
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
export default PPrism;
