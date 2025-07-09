import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

export default function CanModel(props) {
  const { scene } = useGLTF('/models/pepsi.glb');
  const ref = useRef();
  const noise = new ImprovedNoise();
  const timeOffset = Math.random() * 100;

  const [hovered, setHovered] = useState(false);
  const [floatingEnabled, setFloatingEnabled] = useState(false);
  const [rising, setRising] = useState(true);
  const [positionY, setPositionY] = useState(-5);
  const [rotationY, setRotationY] = useState(0);
  const [resumeTimeout, setResumeTimeout] = useState(null);

 
  scene.traverse((child) => {
    if (child.isMesh) {
      const mat = child.material;
      if ('metalness' in mat) mat.metalness = 0.8;
      if ('roughness' in mat) mat.roughness = 0.2;
      if ('envMapIntensity' in mat) mat.envMapIntensity = 1.2;
      child.castShadow = props.castShadow;
      child.receiveShadow = props.receiveShadow;
      if (child.geometry) child.geometry.computeVertexNormals();
    }
  });

 
  useEffect(() => {
    if (!hovered) {
      const timeout = setTimeout(() => setFloatingEnabled(true), 1500);
      setResumeTimeout(timeout);
    } else {
      clearTimeout(resumeTimeout);
      setFloatingEnabled(false);
    }
    return () => clearTimeout(resumeTimeout);
  }, [hovered]);


  useEffect(() => {
    if (!rising) return;

    const riseSpeed = 0.1; 
    const frameRate = 60; 
    const distance = 5;
    const totalFrames = (distance / riseSpeed) * frameRate; 
    const rotationPerFrame = (2 * Math.PI) / totalFrames;

    const riseInterval = setInterval(() => {
      setPositionY((prevY) => {
        const newY = prevY + riseSpeed;
        if (newY >= 0) {
          clearInterval(riseInterval);
          setPositionY(0);
          setRising(false);
          setFloatingEnabled(true);
          return 0;
        }
        return newY;
      });

      setRotationY((prevRot) => prevRot + rotationPerFrame);
    }, 1000 / frameRate); 

    return () => clearInterval(riseInterval);
  }, [rising]);

  useFrame(() => {
    if (!ref.current) return;

    if (rising) {
      ref.current.position.set(0, positionY, 0);
      ref.current.rotation.set(0, rotationY, 0);
      return;
    }

    const time = performance.now() * 0.001 + timeOffset;
    const floatAmp = 0.3;
    const floatSpeed = 0.5;

    if (floatingEnabled) {
      const x = noise.noise(time * floatSpeed, 0, 0) * floatAmp;
      const y = noise.noise(0, time * floatSpeed, 0) * floatAmp;
      const z = noise.noise(0, 0, time * floatSpeed) * floatAmp;

      ref.current.position.set(x, y, z);

      const rotX = noise.noise(time * 0.3, 1, 0) * 0.2;
      const rotY = rotationY + noise.noise(1, time * 0.3, 0) * 0.2; 
      const rotZ = noise.noise(1, 0, time * 0.3) * 0.2;

      ref.current.rotation.set(rotX, rotY, rotZ);
    } else {

      ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.05);
      ref.current.rotation.y = rotationY; 
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.05);
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}