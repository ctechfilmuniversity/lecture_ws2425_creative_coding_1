import * as THREE from 'three';
import { cube, prism, cylinder } from './primitives';

const primitives = [cube, prism, cylinder];
export const randomGeometry = () => {
  return primitives[Math.floor(Math.random() * primitives.length)]();
};

export const randomRotation = () => {
  const axis = Math.floor(Math.random() * 3);
  const angle = Math.floor(Math.random() * 2);
  return new THREE.Euler(
    axis === 0 ? angle * Math.PI * 0.5 : 0,
    axis === 1 ? angle * Math.PI * 0.5 : 0,
    axis === 2 ? angle * Math.PI * 0.5 : 0,
  );
};

export const randomSkip = (threshold = 0.1) => {
  return Math.random() < threshold;
};

export const centerAlign = (
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
) => {
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  if (!geometry.boundingBox) throw new Error('cannot compute boundingBox');
  const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
  return geometry.center().translate(0, height * 0.5, 0);
};

export const randomRange = (min: number, max: number, int?: boolean) => {
  const result = Math.random() * (max - min) + min;
  if (int) return Math.floor(result);
  else return result;
};
