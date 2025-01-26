import * as THREE from 'three';

export interface PVolumeProps {
  rotation?: THREE.Euler;
  position: THREE.Vector3;
  scale?: number;
  material: THREE.Material;
}
