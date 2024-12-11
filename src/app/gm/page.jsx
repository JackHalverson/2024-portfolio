// src/app/gm/page.jsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial, useGLTF, Environment, Text } from '@react-three/drei';
import { useControls } from 'leva';

// Define your 3D model component
function Model(props) {
  const { nodes } = useGLTF('/medias/bustv1.glb');
  const ref = useRef();

  const materialProps = useControls({
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    backside: { value: false },
  })

  // Add subtle rotation and bob animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.1; // Slow rotation
      ref.current.position.y = 0 + Math.sin(t * 0.5) * 0.05; // Subtle bobbing
    }
  });

  return (
    <group ref={ref} {...props} dispose={null} scale={1.5}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh_0.geometry}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

// Preload the model
useGLTF.preload('/medias/bustv1.glb');

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
        <Model position={[0, 0, 0]} />
        <Text
          font={"/fonts/PPNeueMontreal-Bold.otf"}
          position={[0, 0.5, -1]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Hello World
        </Text>
        {/* Controls for orbiting around the model */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
