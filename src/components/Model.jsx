// Model.jsx
'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { useGLTF, MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'

export default function Model(props) {
  const { nodes } = useGLTF('/medias/LandingShapes.glb')

  const materialProps = useControls({
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    backside: { value: false },
  })

  // const materialProps = {
  //   thickness: 0.3,
  //   roughness: 0.5,
  //   transmission: 1,
  //   ior: 0.9,
  //   chromaticAberration: 0.3,
  //   backside: false,
  // }

  const D20Geometry = useMemo(() => nodes.D20.geometry, [nodes.D20.geometry])
  const torusGeometry = useMemo(() => nodes.Torus.geometry, [nodes.Torus.geometry])
  const sphereGeometry = useMemo(() => nodes.Sphere.geometry, [nodes.Sphere.geometry])
  const cylinderGeometry = useMemo(() => nodes.Cylinder.geometry, [nodes.Cylinder.geometry])
  const sphere001Geometry = useMemo(() => nodes.Sphere001.geometry, [nodes.Sphere001.geometry])
  const plusGeometry = useMemo(() => nodes.Plus.geometry, [nodes.Plus.geometry])
  const hollowCubeGeometry = useMemo(() => nodes.HollowCube.geometry, [nodes.HollowCube.geometry])
  const sphere002Geometry = useMemo(() => nodes.Sphere002.geometry, [nodes.Sphere002.geometry])
  const diskGeometry = useMemo(() => nodes.Disk.geometry, [nodes.Disk.geometry])

  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [bobOffset, setBobOffset] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setParallaxOffset(scrollPosition * 0.005)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      setRotation({ x: y * 0.2, y: x * -0.2 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    setBobOffset(Math.sin(t) * 0.05)
  })

  return (
    <group {...props}>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0.5, -1]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Jackson Halverson
      </Text>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, -1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Frontend Design & Developer
      </Text>

      <mesh 
        geometry={D20Geometry} 
        position={[-2.412, -0.472 + (parallaxOffset*.5) + bobOffset, 2.163]} 
        rotation={[Math.PI + rotation.x*.9, rotation.y*.7, Math.PI]}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={torusGeometry} 
        position={[2.465, -0.326 + (parallaxOffset*.5) + bobOffset, 4.193]} 
        rotation={[Math.PI + rotation.x*.5, rotation.y*.9, Math.PI]} 
        scale={0.445}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={sphereGeometry} 
        position={[1.672, 1.086 + (parallaxOffset*.7) + bobOffset, 3.07]} 
        rotation={[Math.PI + rotation.x*.6, rotation.y*.6, Math.PI]} 
        scale={0.305}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={cylinderGeometry} 
        position={[-1.858, 1.707 + (parallaxOffset*1.4) + bobOffset, 0.389]} 
        rotation={[1.763 + rotation.x*.3, 0.961 + rotation.y*.8, 2.109]}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={sphere001Geometry} 
        position={[-2.025, 0.009 + (parallaxOffset*.6) + bobOffset, 3.35]} 
        rotation={[Math.PI + rotation.x*1.2, rotation.y*1, Math.PI]} 
        scale={-0.139}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={plusGeometry} 
        position={[1.433, -0.728 + (parallaxOffset*.8) + bobOffset, 2.432]} 
        rotation={[2.528 + rotation.x*.9, -1.137 + rotation.y*1.5, 1.708]}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={hollowCubeGeometry} 
        position={[1.89, 1.624 + (parallaxOffset*.9) + bobOffset, 0.561]} 
        rotation={[Math.PI + rotation.x*.7, -0.567 + rotation.y*1, 2.543]} 
        scale={0.818}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={sphere002Geometry} 
        position={[-0.947, 1.947 + (parallaxOffset*.4) + bobOffset, -0.169]} 
        rotation={[Math.PI + rotation.x, rotation.y, Math.PI]} 
        scale={0.197}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
      <mesh 
        geometry={diskGeometry} 
        position={[-1.27, -1.213 + (parallaxOffset*1.2) + bobOffset, 3.021]} 
        rotation={[-2.536 + rotation.x*1.1, -0.746 + rotation.y*.7, -2.822]} 
        scale={0.44}>
        <MeshTransmissionMaterial {...materialProps} samples={4} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/medias/LandingShapes.glb')
