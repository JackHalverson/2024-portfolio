'use client'

import React, { useState, useEffect, useRef } from 'react'
import SvgPathLoader from '@/components/SvgPathLoader'
import AnimatedSvgPath from '@/components/AnimatedSvgPath'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CustomCursor from '@/components/CustomCursor'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshTransmissionMaterial, useGLTF, Environment, Svg } from '@react-three/drei'
import { useRouter } from 'next/navigation' // Import useRouter
import "./styles.css"
import ShaderBackground from '@/components/ShaderBackground'
import TiltHoverCard from '@/components/TiltHoverCard'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

const emblemSvgDataUrl = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.31 281">
    <defs>
      <style>.cls-1 { fill: #fff; }</style>
    </defs>
    <polygon class="cls-1" points="185.68 0 185.68 125.28 142.64 125.28 142.64 43.03 17.2 43.03 17.2 0 185.68 0"/>
    <path class="cls-1" d="M259.31,56.9v224.1h-43.03v-98.98h-32.67c-7.81,35.86-35.22,63.75-71.25,72.04v26.94h-43.03v-27.26c-31.72-7.65-57.38-31.24-67.74-62.32l-1.59-4.46,40.96-13.55,1.43,4.62c1.38,4.21,5.98,16.47,18.73,25.72,2.52,1.83,14.27,10.01,30.2,9.82,19.26-.22,37.35-12.6,47.34-31.56h-26.46v15.3h-43.03V57.22h43.03v81.77l103.92.32V57.22l43.19-.32Z"/>
  </svg>
`)}`

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [SceneComponent, setSceneComponent] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const loadScene = async () => {
      const ImportedScene = await import("@/components/Scene");
      setSceneComponent(() => ImportedScene.default);
    };

    loadScene();
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    router.push('/howltech'); // Navigate to the howltech page
  };

  return (
    <main>
      {/* <CustomCursor /> */}
      <ShaderBackground />
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <SvgPathLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && SceneComponent && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <section>
            <SceneComponent />
          </section>

          <article>
            <QuoteSection />
            <div className="bust-container">
              <div className="bust">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
                  <Environment preset="city" />
                  <Model position={[0, 0, 0]} />
                  <Svg src={emblemSvgDataUrl} position={[-0.3, 0.4, -1.5]} scale={0.008} />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </div>
            </div>
          </article>

          <div className='project-title'>
            <h1>Works</h1>
          </div>

          <div className='cards'>
            <TiltHoverCard>
              <div 
                className='howltech card' 
                onClick={handleCardClick} 
                style={{ cursor: 'pointer' }} // Add pointer cursor to indicate interactivity
              >
                <img src='/photos/HowlTech/PhoneMockup.jpg' className='card-photo' />
                <div className='card-content'>
                  <h2 className='card-title'>HowlTech</h2>
                  <p className='card-description'>
                    Inventory tracking software with intuitive displays and systems.
                  </p>
                </div>
              </div>
            </TiltHoverCard>

            {/* Add more cards as needed */}
          </div>

          <AnimatedSvgPath />
        </motion.div>
      )}
    </main>
  );
}

function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="quote-container" ref={ref}>
      <motion.h1
        className="quote"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        Hello, I’m Jackson, a front-end developer and designer based in Salt Lake City, Utah.
      </motion.h1>

      <motion.h1
        className="sub-quote"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        I specialize in UI & UX principles and have a keen eye for detail that extends to logo design, layout composition, and user flows. I enjoy turning ideas into elegant, responsive, and accessible web solutions.
      </motion.h1>
    </div>
  );
}

function Model(props) {
  const { nodes } = useGLTF('/medias/bustv3.glb');
  const ref = useRef();

  const materialProps = {
    thickness: 0.6,
    resolution: 256,
    roughness: 0.5,
    transmission: 1,
    ior: 0.9,
    chromaticAberration: 0.3,
    clearcoat: 1,
    backside: true,
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) { 
      ref.current.rotation.y = t * 0.1;
      ref.current.position.y = 0 + Math.sin(t * 0.5) * 0.05;
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

useGLTF.preload('/medias/bustv3.glb');
