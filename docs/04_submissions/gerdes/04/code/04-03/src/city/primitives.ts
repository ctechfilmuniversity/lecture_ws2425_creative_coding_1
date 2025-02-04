import * as THREE from 'three';

const cube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  return geometry.toNonIndexed();
};

const cylinder = () => {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
  return geometry.toNonIndexed();
};

const prism = () => {
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
  return geometry;
};

export { cube, cylinder, prism };
