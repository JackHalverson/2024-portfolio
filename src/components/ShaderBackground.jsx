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

    // Perlin noise function for randomness
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(20.9898, 78.233))) * 43758.5453);
    }

    // Smooth noise function
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

    // Grain function for consistent noise
    float grain(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;

      // Base dark color (#111111)
      vec3 color = vec3(0.067, 0.067, 0.067);

      // Add Perlin noise for wavy randomness
      float wave = smoothNoise(uv * 4.0 + time * 0.1) * 0.5;

      // Create subtle white spots
      float intensity = smoothstep(0.4, 0.5, wave);
      vec3 whiteSpot = vec3(intensity);

      // Combine base color and white spot
      color += whiteSpot;

      // Add consistent grain overlay
      float noiseValue = grain(uv * 20.0) * 0.03;
      color += noiseValue;

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

export default function ShaderBackground() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      camera={{ position: [0, 0, 1] }}
    >
      <GradientPlane />
    </Canvas>
  )
}
