// Model.jsx
'use client'

import React from 'react'
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'

export default function Model(props) {
  const { nodes } = useGLTF('/medias/LandingShapes.glb') // Ensure the file path is correct

  // Leva controls for simplified material properties
  const materialProps = useControls({
    thickness: { value: 0.3, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.3, min: 0, max: 1 },
    backside: { value: true },
  })

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.D20.geometry} position={[-2.412, -0.472, 2.163]} rotation={[Math.PI, 0, Math.PI]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Torus.geometry} position={[2.465, -0.326, 4.193]} rotation={[Math.PI, 0, Math.PI]} scale={0.445}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Sphere.geometry} position={[1.672, 1.086, 3.07]} rotation={[Math.PI, 0, Math.PI]} scale={0.305}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Cylinder.geometry} position={[-1.858, 1.707, 0.389]} rotation={[1.763, 0.961, 2.109]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Sphere001.geometry} position={[-2.025, 0.009, 3.35]} rotation={[Math.PI, 0, Math.PI]} scale={-0.139}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Plus.geometry} position={[1.433, -0.728, 2.432]} rotation={[2.528, -1.137, 1.708]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.HollowCube.geometry} position={[1.89, 1.624, 0.561]} rotation={[Math.PI, -0.567, 2.543]} scale={0.818}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Sphere002.geometry} position={[-0.947, 1.947, -0.169]} rotation={[Math.PI, 0, Math.PI]} scale={0.197}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh geometry={nodes.Disk.geometry} position={[-1.27, -1.213, 3.021]} rotation={[-2.536, -0.746, -2.822]} scale={0.44}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/medias/LandingShapes.glb') // Ensure path is correct
