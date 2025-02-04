import * as THREE from 'three';
import { PCube, PCylinder, PPrism } from './primitives';
import { useEffect } from 'react';

interface BuildingProps {
  maxHeight?: number;
  cellsX?: number;
  cellsY?: number;
  scale?: number;
  yOffset?: number;
}

const Building = ({
  maxHeight = 32,
  cellsX = 8,
  cellsY = 8,
  scale = 1,
  yOffset = 0,
}: BuildingProps) => {
  const baseComponents = [PCube, PCylinder, PPrism];
  const instances: React.ReactElement[] = [];

  // this cleanup is only necessary in dev mode after hot reload
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    instances.slice(0, instances.length);
  });

  function generateLevel(level: number): void {
    for (let x = 0; x < cellsX; x++) {
      for (let y = 0; y < cellsY; y++) {
        if (Math.random() < 0.1 && level !== 0) {
          break; // return skips entire rest of current level but can yield interesting results with 0.005 probability
        }
        const Component =
          baseComponents[Math.floor(Math.random() * baseComponents.length)];
        instances.push(
          <Component
            key={`${x}-${y}-${level}`}
            material={getMaterial()}
            position={center(
              new THREE.Vector3(x * scale, level * scale, y * scale),
            )}
            rotation={getRotation()}
            scale={scale}
          />,
        );
      }
    }
  }

  function center(current: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(
      current.x - (cellsX * scale) / 2,
      current.y + yOffset,
      current.z - (cellsY * scale) / 2,
    );
  }

  function getMaterial(): THREE.Material {
    const matConc = new THREE.MeshStandardMaterial({
      roughness: 0.4,
      metalness: 0.4,
      color: 0x3a3c3f,
    });
    const emissive = new THREE.MeshStandardMaterial({
      emissive: 0xffba70,
      emissiveIntensity: 1,
    });

    return Math.random() < 0.1 ? emissive : matConc;
  }

  function getRotation(): THREE.Euler {
    const axis = Math.floor(Math.random() * 3);
    const angle = Math.floor(Math.random() * 2);
    return new THREE.Euler(
      axis === 0 ? angle * Math.PI * 0.5 : 0,
      axis === 1 ? angle * Math.PI * 0.5 : 0,
      axis === 2 ? angle * Math.PI * 0.5 : 0,
    );
  }

  for (let level = 0; level < maxHeight; level++) {
    generateLevel(level);
  }

  return <>{instances}</>;
};

export default Building;
