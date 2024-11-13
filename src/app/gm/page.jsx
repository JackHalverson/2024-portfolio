// src/app/gm/page.jsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial, useGLTF, Environment, Text } from '@react-three/drei';

// Define your 3D model component
function Model(props) {
  const { nodes } = useGLTF('/medias/gotem.glb');
  const ref = useRef();

  const materialProps = {
    thickness: 9,
    roughness: 0.5,
    transmission: 1,
    ior: 0.9,
    chromaticAberration: 0.7,
    clearcoat: 0.3,
    backside: false,
  };

  // Add subtle rotation and bob animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.1; // Slow rotation
      ref.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.05; // Subtle bobbing
    }
  });

  return (
    <group ref={ref} {...props} dispose={null} scale={0.01}>
      <mesh castShadow receiveShadow geometry={nodes.gotem.geometry} position={[0, 7.578, 0]} rotation={[1.082, 1.331, 1.407]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Preload the model
useGLTF.preload('/medias/gotem.glb');

// Main page component
export default function Gm() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
        {/* Add lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        {/* Add environment preset */}
        <Environment preset="city" />
        {/* Render the model */}
        <Model position={[0, 0.5, 0]} />
        <Text
          font={"/fonts/PPNeueMontreal-Bold.otf"}
          position={[0, 0.5, -1]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Gotem
        </Text>
        {/* Controls for orbiting around the model */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
