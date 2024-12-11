'use client'

import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { useMotionValue, animate } from 'framer-motion'
import Model from './Model'
import { Environment, Stats } from '@react-three/drei'

function SceneCamera() {
  const { camera, size } = useThree()
  const frustumSize = 10
  const zoom = useMotionValue(1.5) // Initial zoom value

  useEffect(() => {
    const updateCamera = () => {
      const aspect = size.width / size.height
      camera.left = -frustumSize * aspect / 2
      camera.right = frustumSize * aspect / 2
      camera.top = frustumSize / 2
      camera.bottom = -frustumSize / 2
      camera.position.y = 0.4
      camera.zoom = zoom.get() // Set the zoom from motion value
      camera.updateProjectionMatrix()
    }

    updateCamera() // Initial update on mount
    window.addEventListener('resize', updateCamera)

    // Animate the zoom value from 1.5 to 2 with ease-in-out
    animate(zoom, 2, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate: () => {
        camera.zoom = zoom.get()
        camera.updateProjectionMatrix()
      },
    })

    return () => window.removeEventListener('resize', updateCamera)
  }, [camera, size, zoom])

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
        camera={{ position: [0, 0, 10], zoom: 1.5 }}
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
