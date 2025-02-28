import { useLoader, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import videoData from "./components/DataCollection";
import { easing } from "maath";

const ImageBox = ({ imgSrc, size, position, rotation, index, hoveredVideo, setHoveredVideo }) => {
  const texture = useLoader(THREE.TextureLoader, imgSrc);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const [width, height] = size;
  const ref = useRef();

  useFrame((_, delta) => {
    if (hoveredVideo !== null) {
      if (index < hoveredVideo) {
        easing.damp(ref.current.position, "x", position[0] - 0.3, 0.2, delta);
      } else if (index > hoveredVideo) {
        easing.damp(ref.current.position, "x", position[0] + 0.3, 0.2, delta);
      } else {
        easing.damp(ref.current.position, "x", position[0], 0.2, delta);
      }
    } else {
      easing.damp(ref.current.position, "x", position[0], 0.2, delta);
    }
  });

  return (
    <group 
      ref={ref} 
      position={position} 
      rotation={rotation} 
      onPointerEnter={(e) => {
        e.stopPropagation(); 
        setHoveredVideo(index);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHoveredVideo(null);
      }}
    >
      <mesh>
        <boxGeometry args={[width / 2, height / 2, 0.02]} />
        <meshPhysicalMaterial 
          map={texture} 
          transparent 
          opacity={1.3} 
          transmission={0.8} 
        />
      </mesh>
    </group>
  );
};

const ImageStack = ({ filter }) => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollVelocity = useRef(0); // Used for smooth easing

  const filteredData = filter === "Alle"
    ? videoData
    : videoData.filter((data) => data.category.includes(filter));

  const totalImages = filteredData.length;
  const centerOffsetX = totalImages * 0.25;
  const centerOffsetY = totalImages * 0.25;

  // Handle scroll event
  useEffect(() => {
    const handleScroll = (event) => {
      scrollVelocity.current += event.deltaY * 0.005;
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useFrame((_, delta) => {
    easing.damp(scrollVelocity, "current", 0, 0.1, delta); 
    setScrollOffset((prev) => prev + scrollVelocity.current);
  });

  return (
    <>
      {filteredData.map((data, index) => {
        const { imgSrc, size } = data;


        const offsetX = index * 0.9 - centerOffsetX + scrollOffset * 0.9;
        const offsetY = index * 0.9 - centerOffsetY + scrollOffset * 0.9;
        const offsetZ = index * -0.2 + scrollOffset * -0.2;

        return (
          <ImageBox
            key={index}
            imgSrc={imgSrc}
            size={size}
            position={[offsetX, offsetY, offsetZ]}
            rotation={[0.4, Math.PI / -6, -0]}
            index={index}
            hoveredVideo={hoveredVideo}
            setHoveredVideo={setHoveredVideo}
          />
        );
      })}
    </>
  );
};

const ThreeScene = ({ filter }) => {
  return (
    <>
      <OrthographicCamera position={[0, 20, 80]} zoom={60} />
      <ambientLight intensity={15} />
      <ImageStack filter={filter} />
    </>
  );
};

export default ThreeScene;
