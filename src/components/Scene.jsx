// Scene.jsx
'use client'

import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'
import { OrbitControls, Environment } from '@react-three/drei'

export default function Scene() {
  const aspect = window.innerWidth / window.innerHeight
  const frustumSize = 10 // Adjust based on the scene scale you want

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas
        shadows
        style={{ background: '#111111' }}
        orthographic
        camera={{
          left: -frustumSize * aspect / 2,
          right: frustumSize * aspect / 2,
          top: frustumSize / 2,
          bottom: -frustumSize / 2,
          near: 0.1,
          far: 100,
          position: [0, 5, 10], // Adjust position as needed
          zoom: 1.5, // Adjust zoom level for desired scale
        }}
      >
        {/* 3D Model */}
        <Model />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1.5} position={[2, 5, 5]} castShadow />

        {/* Environment */}
        <Environment preset="city" />

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
