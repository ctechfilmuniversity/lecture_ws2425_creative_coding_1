import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';

import { randomGeometry, randomRotation, randomSkip } from './helpers';

interface StructureProps {
  height?: number;
  cellsX?: number;
  cellsZ?: number;
}

const Single = ({ height = 32, cellsX = 8, cellsZ = 8 }: StructureProps) => {
  const colors = useControls('colors', {
    concrete: '#3a3c3f',
    lights: '#ffba70',
    emissive: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const concreteInstance = useRef<THREE.Mesh>(undefined!);
  const lightsInstance = useRef<THREE.Mesh>(undefined!);

  const [geometries, setGeometries] = useState<{
    concrete: THREE.BufferGeometry | null;
    lights: THREE.BufferGeometry | null;
  }>({ concrete: null, lights: null });

  useEffect(() => {
    const transformer = new THREE.Object3D();
    const concreteGeometries: THREE.BufferGeometry[] = [];
    const lightsGeometries: THREE.BufferGeometry[] = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < cellsX; x++) {
        for (let z = 0; z < cellsZ; z++) {
          if (randomSkip()) continue;

          const instance = randomGeometry();
          transformer.position.set(x, y, z);
          transformer.rotation.copy(randomRotation());
          transformer.updateMatrix();
          instance.applyMatrix4(transformer.matrix);

          if (Math.random() >= 0.1) concreteGeometries.push(instance);
          else lightsGeometries.push(instance);
        }
      }
    }

    const mergedConcrete =
      concreteGeometries.length > 0
        ? BufferGeometryUtils.mergeGeometries(concreteGeometries)
        : null;

    const mergedLights =
      lightsGeometries.length > 0
        ? BufferGeometryUtils.mergeGeometries(lightsGeometries)
        : null;

    setGeometries({
      concrete: mergedConcrete,
      lights: mergedLights,
    });

    return () => {
      mergedConcrete?.dispose();
      mergedLights?.dispose();
    };
  }, [height, cellsX, cellsZ]);

  if (!geometries.concrete && !geometries.lights) {
    return null;
  }

  return (
    <object3D scale={0.2}>
      {geometries.concrete && (
        <mesh ref={concreteInstance} geometry={geometries.concrete}>
          <meshStandardMaterial color={colors.concrete} />
        </mesh>
      )}
      {geometries.lights && (
        <mesh ref={lightsInstance} geometry={geometries.lights}>
          <meshStandardMaterial
            emissive={colors.lights}
            emissiveIntensity={colors.emissive}
          />
        </mesh>
      )}
    </object3D>
  );
};

export default Single;
