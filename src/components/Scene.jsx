'use client'

import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'
import Model from './Model'
import { Environment, Stats } from '@react-three/drei'

function SceneCamera() {
  const { camera, size } = useThree()
  const frustumSize = 10

  useEffect(() => {
    const updateCamera = () => {
      const aspect = size.width / size.height
      camera.left = -frustumSize * aspect / 2
      camera.right = frustumSize * aspect / 2
      camera.top = frustumSize / 2
      camera.bottom = -frustumSize / 2
      camera.position.y = 0.4
      camera.updateProjectionMatrix()
    }

    updateCamera() // Initial update on mount
    window.addEventListener('resize', updateCamera) // Update on window resize
    return () => window.removeEventListener('resize', updateCamera)
  }, [camera, size])

  return null
}

function SceneLighting() {
  return (
    <directionalLight
      position={[-7.2, 5.1, 5.8]}
      intensity={5}
      color="#ffffff"
    />
  )
}

export default function Scene() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        shadows
        style={{ background: 'transparent' }}
        orthographic
        camera={{ position: [0, 0, 10], zoom: 2 }}
      >
        <Stats />
        <SceneCamera />
        <SceneLighting />
        <Model />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
