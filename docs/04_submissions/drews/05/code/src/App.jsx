import React, { useRef } from 'react';
import * as THREE from 'three'
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/HomePage';
import { ItemPage } from './pages/ItemPage';
import { About } from './pages/About'
import { CV } from './pages/CV'
import { Contact } from './pages/Contact'
import './App.css'; 
import { Canvas, useFrame } from '@react-three/fiber'
import { Clouds, Cloud, Sky as SkyImpl } from "@react-three/drei"
import { OrbitControls } from '@react-three/drei'


const App = () => {
  return (
    <>
<Canvas>
<ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Sky />
      <OrbitControls enableZoom={false} />
      </Canvas>


      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/cv" component={CV} />
          <Route path="/contact" component={Contact} />
          <Route path="/item/:id" component={ItemPage} />
        </Switch>
      </div>
      </>
  );
};

export default App;

function Sky() {
  const ref = useRef()
  const cloud0 = useRef()

  const color = "white"
  const x = 6
  const y = 1
  const z = -1
  const range = 40
  const opacity = 0.8
  const speed = 0.1
  const growth = 4
  const volume = 6
  const fade = 10

  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2
    cloud0.current.rotation.y -= delta * speed
  })

  return (
    <>
      <SkyImpl />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={range}>
          <Cloud ref={cloud0} opacity={opacity} growth={growth} color={color} bounds={[x, y, z]} />
          <Cloud opacity={opacity} growth={growth} color="#eed0d0" seed={2} position={[15, 0, 0]} bounds={[x, y, z]} />
          <Cloud opacity={opacity} growth={growth} color="#d0e0d0" seed={3} position={[-15, 0, 0]} bounds={[x, y, z]} />
          <Cloud opacity={opacity} growth={growth} color="#a0b0d0" seed={4} position={[0, 0, -12]} bounds={[x, y, z]} />
          <Cloud opacity={opacity} growth={growth} color="#c0c0dd" seed={5} position={[0, 0, 12]} bounds={[x, y, z]} />
          <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={1.25} seed={0.3} bounds={200} volume={200} />
        </Clouds>
      </group>
    </>
  )
}