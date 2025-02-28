import React from 'react';
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import NavMenu from './components/NavMenu';
import Title from './components/Title';
import ThreeScene from './ThreeScene';
import { Canvas } from "@react-three/fiber"; 
import './App.css';

function AppContent() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "Alle";

  return (
    <>
      <div>
        <Title />
      </div>
      <div id="three-container">
        <Canvas>
          <ThreeScene filter={selectedCategory} />
        </Canvas>
      </div>
      <div>
        <NavMenu />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
