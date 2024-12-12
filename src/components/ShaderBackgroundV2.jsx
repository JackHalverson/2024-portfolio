'use client'

import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import React, { useRef } from 'react'
import { PlaneGeometry } from 'three'

// Extend PlaneGeometry for use in JSX
extend({ PlaneGeometry })

// Custom Shader Material
const GradientMaterial = shaderMaterial(
  { time: 0 },
  // Vertex Shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    varying vec2 vUv;

    // Noise function for randomness
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // Large-scale smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);

      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;

      // Generate large-scale waves with increased intensity
      float wave1 = smoothNoise(uv * 4.0 + time * 0.2) * 0.4;
      float wave2 = smoothNoise(uv * 6.0 - time * 0.15) * 0.3;

      // Combine waves to create a dynamic pattern
      float combinedWaves = wave1 + wave2;

      // Add grain with higher intensity
      float grain = noise(uv * 50.0) * 0.15;

      // Darker sky blue base color
      vec3 skyBlue = vec3(0.2, 0.4, 0.7);

      // Mix the waves and grain into the base color with more contrast
      vec3 color = skyBlue + vec3(combinedWaves * 0.3 + grain * 0.1);

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ GradientMaterial })

function GradientPlane() {
  const materialRef = useRef()
  useFrame(({ clock }) => {
    materialRef.current.time = clock.getElapsedTime()
  })

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <gradientMaterial ref={materialRef} />
    </mesh>
  )
}

export default function ShaderBackgroundV2() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}
      camera={{ position: [0, 0, 1] }}
    >
      <GradientPlane />
    </Canvas>
  )
}
