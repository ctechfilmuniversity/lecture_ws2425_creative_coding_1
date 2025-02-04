import { /*CameraControls,*/ OrbitControls } from '@react-three/drei';
// import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// import { useControls } from 'leva';

const ControlledCam = () => {
  // const controlsRef = useRef<CameraControls>(undefined!);
  // const data = useControls('camera settings', {
  //   position: {
  //     x: 0,
  //     y: 10,
  //     z: -10,
  //   },
  //   target: {
  //     x: 0,
  //     y: 10,
  //     z: 0,
  //   },
  //   startAngle: Math.PI,
  //   resetTime: 1,
  //   vertRange: Math.PI,
  //   horRange: Math.PI * 0.5,
  // });

  // const repanCam = () => {
  //   if (!controlsRef.current) return;
  //   controlsRef.current.setLookAt(
  //     data.position.x,
  //     data.position.y,
  //     data.position.z,
  //     data.target.x,
  //     data.target.y,
  //     data.target.z,
  //     true,
  //   );
  // };

  // useEffect(() => {
  //   controlsRef.current.setPosition(
  //     data.position.x,
  //     data.position.y,
  //     data.position.z,
  //   );
  //   controlsRef.current.setTarget(data.target.x, data.target.y, data.target.z);
  //   controlsRef.current.maxPolarAngle = data.vertRange;
  //   controlsRef.current.minPolarAngle = -data.vertRange;
  //   controlsRef.current.maxAzimuthAngle = data.startAngle + data.horRange;
  //   controlsRef.current.minAzimuthAngle = data.startAngle - data.horRange;
  //   controlsRef.current.azimuthAngle = data.startAngle;
  //   controlsRef.current.smoothTime = data.resetTime;
  //   controlsRef.current.maxZoom = 1.111;
  //   controlsRef.current.minZoom = 0.999;
  // });

  return (
    <>
      {/* <CameraControls ref={controlsRef} onEnd={repanCam} /> */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        minDistance={12}
        maxDistance={16}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 3}
        target={new THREE.Vector3(0, 1, 0)}
      />
    </>
  );
};

export default ControlledCam;
