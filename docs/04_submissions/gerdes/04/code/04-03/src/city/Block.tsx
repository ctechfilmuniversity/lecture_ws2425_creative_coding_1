import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';

// import { generateBlock } from './blockGen';
import {
  randomGeometry,
  randomRotation,
  randomSkip,
  centerAlign,
  randomRange,
} from './helpers';

interface StructureProps {
  maxHeight?: number;
  cellsX?: number;
  cellsZ?: number;
  unitsX?: number;
  unitsZ?: number;
  spacing?: number;
}

const Block = ({
  maxHeight = 64,
  cellsX = 8,
  cellsZ = 8,
  unitsX = 20,
  unitsZ = 20,
  spacing = 1.2,
}: StructureProps) => {
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

    for (let width = 0; width < unitsX; width++) {
      for (let depth = 0; depth < unitsZ; depth++) {
        if (randomSkip(0.3)) continue;
        for (let y = 0; y < randomRange(4, maxHeight, true); y++) {
          for (let x = 0; x < cellsX; x++) {
            for (let z = 0; z < cellsZ; z++) {
              if (randomSkip()) continue;

              const instance = randomGeometry();
              transformer.position.set(
                x + width * cellsX * spacing,
                y,
                z + depth * cellsZ * spacing,
              );
              transformer.rotation.copy(randomRotation());
              transformer.updateMatrix();
              instance.applyMatrix4(transformer.matrix);

              if (Math.random() >= 0.1) concreteGeometries.push(instance);
              else lightsGeometries.push(instance);
            }
          }
        }
      }
    }

    const mergedConcrete =
      concreteGeometries.length > 0
        ? centerAlign(BufferGeometryUtils.mergeGeometries(concreteGeometries))
        : null;

    const mergedLights =
      lightsGeometries.length > 0
        ? centerAlign(BufferGeometryUtils.mergeGeometries(lightsGeometries))
        : null;

    setGeometries({
      concrete: mergedConcrete,
      lights: mergedLights,
    });

    return () => {
      mergedConcrete?.dispose();
      mergedLights?.dispose();
    };
  }, [maxHeight, cellsX, cellsZ, spacing, unitsX, unitsZ]);

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

export default Block;
