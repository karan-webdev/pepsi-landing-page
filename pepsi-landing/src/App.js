import './App.css';
import Navbar from './components/navbar';
import Hero from './components/hero';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import CanModel from './components/canmodel';
import { useRef } from 'react';
import * as THREE from 'three';

function DynamicLight() {
  const { camera, scene } = useThree();
  const lightRef = useRef();

  if (!lightRef.current) {
    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(10, 15, 10);
    light.castShadow = true;
    light.shadow.mapSize.set(512, 512);
    light.target = new THREE.Object3D();
    scene.add(light.target);
    scene.add(light);
    lightRef.current = light;
  }

  useFrame(() => {
    if (lightRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      lightRef.current.position.copy(camera.position).add(dir.multiplyScalar(20));
      lightRef.current.target.position.copy(camera.position);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return null;
}

function App() {
  return (
    <div className="App" style={{ height: 'calc(100vh - 96px)', width: '100vw' }}>
      <Navbar />
      <Hero className="Hero" />
      <Canvas camera={{ position: [15, 5, 20], fov: 50 }} shadows>
  
        <ambientLight intensity={0.6} />

    
        <hemisphereLight
          skyColor={0xffffff}
          groundColor={0x444444}
          intensity={0.8}
          position={[0, 20, 0]}
        />

   
        <DynamicLight />

      
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr"
          background={false}
        />

  
        <CanModel castShadow={true} receiveShadow={true} />

 
        <OrbitControls enableZoom={false} enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}

export default App;
